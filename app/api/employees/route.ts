import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = getServerSession();

  if (!session) {
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
      jobPosition,
      profile_photo,
      employeeType,
    } = body;
    console.log(body);
    // First, check if the department exists
    const existingDepartment = await prisma.department.findUnique({
      where: { id: departmentId },
    });

    console.log(existingDepartment);

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
        jobPosition,
        profile_photo,
        employeeType: 'fullTime',
        employeeDepartment: {
          connect: {
            id: departmentId,
          },
        },
        // leaveBalance: {
        //   create: [
        //     {
        //       leaveType: 'Casual',
        //       balance: employeeType === 'fullTime' ? 7 : 1,
        //     },
        //     {
        //       leaveType: 'Annual',
        //       balance: employeeType === 'fullTime' ? 7 : 0,
        //     },
        //     {
        //       leaveType: 'Medical',
        //       balance: employeeType === 'fullTime' ? 7 : 1,
        //     },
        //     {
        //       leaveType: 'Unpaid',
        //       balance: 0,
        //     },
        //     {
        //       leaveType: 'Duty',
        //       balance: 0,
        //     },
        //     {
        //       leaveType: 'BroughtForward',
        //       balance: 0,
        //     },
        //   ],
        // },
      },
      // include: {
      //   leaveBalance: true,
      // },
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
  const session = getServerSession();

  if (!session) {
    throw new NextResponse('Unauthorized', { status: 401 });
  }
  try {
    const employees = await prisma.employee.findMany();
    return NextResponse.json(employees);
  } catch (error: any) {
    return new Response(`Could not fetch employees - ${error.message}`, {
      status: 500,
    });
  }
}
