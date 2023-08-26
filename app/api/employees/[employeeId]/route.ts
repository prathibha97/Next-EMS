import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface IParams {
  employeeId?: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  const { employeeId } = params;
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
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
    relatedUser,
    idCopy,
    resumeCopy,
    passbookCopy,
  } = body;
  try {
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
        relatedUser,
        idCopy,
        resumeCopy,
        passbookCopy,
      },
    });
    return NextResponse.json(employee);
  } catch (error: any) {
    return new Response(`Could not update employee - ${error.message}`, {
      status: 500,
    });
  }
}
