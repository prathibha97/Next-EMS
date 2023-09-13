import prisma from '@/lib/prisma';
import { LeaveType } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

interface IParams {
  employeeId?: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  const session = getServerSession();
  if (!session) {
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
  const session = getServerSession();
  if (!session) {
    throw new NextResponse('Unauthorized', { status: 401 });
  }
  try {
    const { employeeId } = params;
    const body = await req.json();
    const {
      workAddress,
      workLocation,
      workingHours,
      startDate,
      timeZone,
      privateAddress,
      personalEmail,
      phone,
      bankAccountNumber,
      bankName,
      maritalStatus,
      numberOfDependents,
      emergencyContactName,
      emergencyContactPhone,
      nationality,
      idNumber,
      gender,
      dateOfBirth,
      employeeType,
      userId,
      idCopy,
      resumeCopy,
      passbookCopy,
    } = body;

    const leaveBalanceData = createLeaveBalanceData(body.employeeType);

    const employee = await prisma.employee.update({
      where: {
        id: employeeId,
      },
      data: {
        workAddress,
        workLocation,
        workingHours,
        startDate,
        timeZone,
        privateAddress,
        personalEmail,
        phone,
        bankAccountNumber,
        bankName,
        maritalStatus,
        numberOfDependents,
        emergencyContactName,
        emergencyContactPhone,
        nationality,
        idNumber,
        gender,
        dateOfBirth,
        employeeType,
        userId,
        idCopy,
        resumeCopy,
        passbookCopy,
        leaveBalance: {
          create: leaveBalanceData,
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

function createLeaveBalanceData(employeeType: string) {
  return [
    {
      leaveType: 'Casual' as LeaveType,
      balance: employeeType === 'fullTime' ? 7 : 1,
    },
    {
      leaveType: 'Annual' as LeaveType,
      balance: employeeType === 'fullTime' ? 7 : 0,
    },
    {
      leaveType: 'Medical' as LeaveType,
      balance: employeeType === 'fullTime' ? 7 : 1,
    },
    {
      leaveType: 'Unpaid' as LeaveType,
      balance: 0,
    },
    {
      leaveType: 'Duty' as LeaveType,
      balance: 0,
    },
    {
      leaveType: 'BroughtForward' as LeaveType,
      balance: 0,
    },
  ];
}
