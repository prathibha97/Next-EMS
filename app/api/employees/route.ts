import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../auth/[...nextauth]/options';

export async function POST(req: Request) {
  const session = await getAuthSession();

  if (!session || session.user.role !== 'ADMIN') {
    throw new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      name,
      workEmail,
      position,
      departmentId,
      workMobile,
      personalMobile,
      profile_photo,
      employeeType,
    } = body;

    // check if the department exists
    const existingDepartment = await prisma.department.findUnique({
      where: { id: departmentId },
    });

    if (!existingDepartment) {
      return new Response(`Department with ID ${departmentId} not found`, {
        status: 404,
      });
    }

    // Create the employee and associate it with the department
    const employee = await prisma.employee.create({
      data: {
        name,
        workEmail,
        position,
        workMobile,
        personalMobile,
        profile_photo,
        employeeType,
        employeeDepartment: {
          connect: {
            id: departmentId,
          },
        },
      },
    });


    // Update the department's employees list
    await prisma.department.update({
      where: { id: departmentId },
      data: {
        employees: {
          connect: { id: employee.id },
        },
      },
    });

    return NextResponse.json(employee);
  } catch (error: any) {
    return new Response(`Could not create employee - ${error.message}`, {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  const session = await getAuthSession();

  if (!session) {
    throw new NextResponse('Unauthorized', { status: 401 });
  }
  try {
    const employees = await prisma.employee.findMany({
      include: {
        employeeDepartment: true,
        leaveBalance: true,
        Department: true,
        Attendance: true,
      },
    });
    return NextResponse.json(employees);
  } catch (error: any) {
    return new Response(`Could not fetch employees - ${error.message}`, {
      status: 500,
    });
  }
}
