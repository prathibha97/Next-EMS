import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../../auth/[...nextauth]/options';

interface IParams {
  payrollId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const session = await getAuthSession();

  if (!session || session.user.role !== 'ADMIN') {
    throw new NextResponse('Unauthorized', { status: 401 });
  }

  const { payrollId } = params;

  try {
    await prisma.payroll.delete({
      where: {
        id: payrollId,
      },
    });
  } catch (error) {
    console.error(error);
    throw new NextResponse('Internal Server Error', { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}

export async function PUT(req: Request, { params }: { params: IParams }) {
  const session = await getAuthSession();

  if (!session || session.user.role !== 'ADMIN') {
    throw new NextResponse('Unauthorized', { status: 401 });
  }

  const { payrollId } = params;
  const body = await req.json();

  const {
    monthYear,
    basicSalary,
    dataAllowance,
    mobileAllowance,
    projectAllowance,
    performanceAllowance,
    holidayAllowance,
    salaryAdvance,
    otherDeductions,
  } = body;

  try {
    // Calculate contributions and deductions
    const employeeEpfContribution = 0.08 * basicSalary;
    const companyEpfContribution = 0.15 * basicSalary;
    const companyEtfContribution = 0.03 * basicSalary;
    const totalDeductions =
      employeeEpfContribution + otherDeductions + salaryAdvance;

    // Calculate net salary
    const netSalary =
      basicSalary +
      (dataAllowance || 0) +
      (mobileAllowance || 0) +
      (projectAllowance || 0) +
      (performanceAllowance || 0) +
      (holidayAllowance || 0) -
      totalDeductions;

    // Save the calculated values in your database using Prisma
    const payroll = await prisma.payroll.update({
      where: {
        id: payrollId,
      },
      data: {
        monthYear,
        basicSalary,
        dataAllowance,
        mobileAllowance,
        projectAllowance,
        performanceAllowance,
        holidayAllowance,
        otherAllowances: 0, // You need to handle this value
        salaryAdvance,
        epfDeduction: employeeEpfContribution,
        companyEpfContribution,
        companyEtfContribution,
        otherDeductions,
        netSalary,
      },
    });

    return NextResponse.json(payroll);
  } catch (error: any) {
    return new Response(`Could not create payroll - ${error.message}`, {
      status: 500,
    });
  }
}
