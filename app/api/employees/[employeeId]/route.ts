import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../../auth/[...nextauth]/options';

interface IParams {
  employeeId?: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  const session = await getAuthSession();
  if (!session || session.user.role !== 'ADMIN') {
    throw new NextResponse('Unauthorized', { status: 401 });
  }

  const { employeeId } = params;
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
      include: {
        Department: true,
        user: true,
        Attendance: true,
        Payroll: true,
        Leave: true,
        leaveBalance: true,
      },
    });
    return NextResponse.json(employee);
  } catch (error: any) {
    return new Response(`Could not fetch employee - ${error.message}`, {
      status: 500,
    });
  }
}

export async function PUT(req: Request, { params }: { params: IParams }) {
  const session = await getAuthSession();
  if (!session || session.user.role !== 'ADMIN') {
    throw new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { employeeId } = params;
    const body = await req.json();

    const {
      userId,
      annualLeaves,
      casualLeaves,
      medicalLeaves,
      dutyLeaves,
      unpaidLeaves,
      ...otherEmployeeData
    } = body;

    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error(`User with id ${userId} not found.`);
      }
    }

    const updateData = {
      ...otherEmployeeData,
    };

    if (userId) {
      updateData.user = {
        connect: {
          id: userId,
        },
      };
    }

    const employee = await prisma.employee.update({
      where: {
        id: employeeId,
      },
      data: updateData,
    });

    // Create leave balance for the employee
    const leaveBalance = await prisma.leaveBalance.create({
      data: {
        employeeId: employee.id,
        annual: parseInt(annualLeaves) || 0,
        casual: parseInt(casualLeaves),
        medical: parseInt(medicalLeaves),
        unpaid: parseInt(unpaidLeaves) || 0,
        broughtForward: 0,
        duty: parseInt(dutyLeaves) || 0,
      },
    });

    // Associate leaveBalance with employee
    await prisma.employee.update({
      where: { id: employee.id },
      data: {
        leaveBalance: {
          connect: {
            id: leaveBalance.id,
          },
        },
      },
    });

    return NextResponse.json(employee);
  } catch (error: any) {
    return new Response(`Could not update employee - ${error.message}`, {
      status: 500,
    });
  }
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const session = await getAuthSession();
    if (!session || session.user.role !== 'ADMIN') {
      throw new NextResponse('Unauthorized', { status: 401 });
    }
    const employee = await prisma.employee.findUnique({
      where: {
        id: params.employeeId,
      },
    });
    if (!employee) {
      return new NextResponse('Employee not found', { status: 404 });
    }

    const removedEmployee = await prisma.employee.delete({
      where: {
        id: params.employeeId,
      },
    });
    return NextResponse.json(removedEmployee);
  } catch (error: any) {
    console.log(error.message);
    return new Response(`Could not remove employee - ${error.message}`, {
      status: 500,
    });
  }
}
