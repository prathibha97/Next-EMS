import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

interface IParams {
  departmentId: string;
  employeeId: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  const session = await getServerSession();
  if (!session) {
    throw new NextResponse('Unauthenticated', { status: 401 });
  }

  // if (session.user.role !== 'ADMIN') {
  //   throw new NextResponse('Unauthorized', { status: 403 });
  // }

  const { departmentId } = params;
  try {
    const departments = await prisma.department.findUnique({
      where: {
        id: departmentId,
      },
      include: {
        employees: true,
        manager: true,
      },
    });
    if (!departments) {
      return new Response(`Could not find departments`, {
        status: 404,
      });
    }
    return NextResponse.json(departments);
  } catch (error: any) {
    return new Response(`Could not fetch department - ${error.message}`, {
      status: 500,
    });
  }
}


export async function DELETE(req: Request, { params }: { params: IParams }) {
  const session = await getServerSession();
  if (!session) {
    throw new NextResponse('Unauthenticated', { status: 401 });
  }
// console.log(session.user.role);
//   if(session.user.role !== 'ADMIN') {
//     throw new NextResponse('Unauthorized', { status: 403 });
//   }
  const { departmentId } = params;

  try {
    // Find the department and include associated employees
    const department = await prisma.department.findUnique({
      where: { id: departmentId },
      include: { employees: true },
    });

    if (!department) {
      throw new Error('Department not found');
    }

    // Update each employee's department information
    const employees = department.employees;
    const updatedEmployees = await Promise.all(
      employees.map(async (employee) => {
        return await prisma.employee.update({
          where: { id: employee.id },
          data: { departmentId: null }, // Remove association with department
        });
      })
    );

    // Finally, delete the department itself
    await prisma.department.delete({
      where: { id: departmentId },
    });

    return new NextResponse(`Department and associated employees updated.`, {
      status: 200,
    });
  } catch (error:any) {
    throw new NextResponse(`Could not remove department - ${error.message}`, {
      status: 500,
    });
  }
}