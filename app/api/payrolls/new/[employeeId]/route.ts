import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../../../auth/[...nextauth]/options';

interface IParams {
  employeeId?: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  const session = await getAuthSession();

  if (!session || session.user.role !== 'ADMIN') {
    throw new NextResponse('Unauthorized', { status: 401 });
  }

  const { employeeId } = params;
  const body = await req.json();

  const {
    month,
    year,
    basicSalary,
    dataAllowance,
    mobileAllowance,
    projectAllowance,
    performanceAllowance,
    holidayAllowance,
    salaryAdvance,
    epfDeduction,
    otherDeductions,
  } = body;

  try {
    // Calculate contributions and deductions
    const employeeEpfContribution = 0.08 * basicSalary;
    const companyEpfContribution = 0.15 * basicSalary;
    const companyEtfContribution = 0.03 * basicSalary;
    const totalDeductions =
      employeeEpfContribution + otherDeductions + salaryAdvance;

    const totalEarnings =
      basicSalary +
      dataAllowance +
      mobileAllowance +
      projectAllowance +
      performanceAllowance +
      holidayAllowance;

    // Calculate net salary
    const netSalary = totalEarnings - totalDeductions;

    // Save the calculated values in your database using Prisma
    const payroll = await prisma.payroll.create({
      data: {
        month,
        year,
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
        totalDeductions,
        totalEarnings,
        employee: {
          connect: {
            id: employeeId,
          },
        },
      },
    });

    return NextResponse.json(payroll);
  } catch (error: any) {
    return new Response(`Could not create payroll - ${error.message}`, {
      status: 500,
    });
  }
}
