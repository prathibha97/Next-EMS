// import prisma from '@/lib/prisma';
// import { NextResponse } from 'next/server';
// import { getAuthSession } from '../../../auth/[...nextauth]/options';

// interface IParams {
//   employeeId?: string;
// }

// export async function POST(req: Request, { params }: { params: IParams }) {
//   const session = await getAuthSession();

//   if (!session || session.user.role !== 'ADMIN') {
//     throw new NextResponse('Unauthorized', { status: 401 });
//   }

//   const { employeeId } = params;
//   const body = await req.json();

//   const {
//     monthYear,
//     basicSalary,
//     dataAllowance,
//     mobileAllowance,
//     projectAllowance,
//     performanceAllowance,
//     holidayAllowance,
//     salaryAdvance,
//     otherDeductions,
//   } = body;

//   try {
//     // Calculate contributions and deductions
//     const employeeEpfContribution = 0.08 * (basicSalary + dataAllowance + mobileAllowance);
//     const companyEpfContribution =
//       0.15 * (basicSalary + dataAllowance + mobileAllowance);
//     const companyEtfContribution =
//       0.03 * (basicSalary + dataAllowance + mobileAllowance);
//     const totalDeductions =
//       employeeEpfContribution + otherDeductions + salaryAdvance;

//     const totalEarnings =
//       basicSalary +
//       dataAllowance +
//       mobileAllowance +
//       projectAllowance +
//       performanceAllowance +
//       holidayAllowance;

//     // Calculate net salary
//     const netSalary = totalEarnings - totalDeductions;

//     // Save the calculated values in your database using Prisma
//     const payroll = await prisma.payroll.create({
//       data: {
//         monthYear,
//         basicSalary,
//         dataAllowance,
//         mobileAllowance,
//         projectAllowance,
//         performanceAllowance,
//         holidayAllowance,
//         otherAllowances: 0, // You need to handle this value
//         salaryAdvance,
//         epfDeduction: employeeEpfContribution,
//         companyEpfContribution,
//         companyEtfContribution,
//         otherDeductions,
//         netSalary,
//         totalDeductions,
//         totalEarnings,
//         employee: {
//           connect: {
//             id: employeeId,
//           },
//         },
//       },
//     });

//     return NextResponse.json(payroll);
//   } catch (error: any) {
//     return new Response(`Could not create payroll - ${error.message}`, {
//       status: 500,
//     });
//   }
// }


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
    monthYear,
    basicSalary,
    dataAllowance,
    mobileAllowance,
    projectAllowance,
    performanceAllowance,
    holidayAllowance,
    otherDeductions,
  } = body;

  try {
    // Calculate contributions and deductions
    const employeeEpfContribution =
      0.08 * (basicSalary + dataAllowance + mobileAllowance);
    const companyEpfContribution =
      0.15 * (basicSalary + dataAllowance + mobileAllowance);
    const companyEtfContribution =
      0.03 * (basicSalary + dataAllowance + mobileAllowance);

    // Calculate salary advances and loan instalments if not settled
    let salaryAdvance = 0; // Initialize with 0
    let loanDeduction = 0; // Initialize with 0

    // Check if there are unsettled salary advances
    const unsettledSalaryAdvances = await prisma.salaryAdvance.findMany({
      where: {
        employeeId,
        isSettled: false,
      },
    });

    if (unsettledSalaryAdvances.length > 0) {
      // Calculate total unsettled salary advances
      salaryAdvance = unsettledSalaryAdvances.reduce(
        (total, advance) => total + advance.amount,
        0
      );
    }

    // Check if there are unsettled loans
    const unsettledLoans = await prisma.loan.findMany({
      where: {
        employeeId,
        isSettled: false,
      },
    });

    if (unsettledLoans.length > 0) {
      // Calculate total unsettled loan instalments
      loanDeduction = unsettledLoans.reduce(
        (total, loan) => total + loan.amount / loan.instalments!,
        0
      );
    }

    const totalDeductions =
      employeeEpfContribution + otherDeductions + salaryAdvance + loanDeduction;

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
        monthYear,
        basicSalary,
        dataAllowance,
        mobileAllowance,
        projectAllowance,
        performanceAllowance,
        holidayAllowance,
        otherAllowances: 0, // You need to handle this value
        epfDeduction: employeeEpfContribution,
        companyEpfContribution,
        companyEtfContribution,
        salaryAdvance,
        loanDeduction,
        otherDeductions,
        totalDeductions,
        totalEarnings,
        netSalary,
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
