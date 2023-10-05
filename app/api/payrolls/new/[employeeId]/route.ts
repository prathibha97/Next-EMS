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
// /////////////////////////////////////////////////////////////
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
//     otherDeductions,
//     workingDays,
//     paidDays
//   } = body;

//   try {
//     // Calculate contributions and deductions
//     const employeeEpfContribution =
//       0.08 * (basicSalary + dataAllowance + mobileAllowance);
//     const companyEpfContribution =
//       0.15 * (basicSalary + dataAllowance + mobileAllowance);
//     const companyEtfContribution =
//       0.03 * (basicSalary + dataAllowance + mobileAllowance);

//     // Calculate salary advances and loan instalments if not settled
//     let salaryAdvance = 0; // Initialize with 0
//     let loanDeduction = 0; // Initialize with 0

//     // Check if there are unsettled salary advances
//     const unsettledSalaryAdvances = await prisma.salaryAdvance.findMany({
//       where: {
//         employeeId,
//         isSettled: false,
//       },
//     });

//     if (unsettledSalaryAdvances.length > 0) {
//       // Calculate total unsettled salary advances
//       salaryAdvance = unsettledSalaryAdvances.reduce(
//         (total, advance) => total + advance.amount,
//         0
//       );

//       // Mark salary advances as settled
//       await prisma.salaryAdvance.updateMany({
//         where: {
//           employeeId,
//           isSettled: false,
//         },
//         data: {
//           isSettled: true,
//         },
//       });
//     }

//     // Check if there are unsettled loans
//     const unsettledLoans = await prisma.loan.findMany({
//       where: {
//         employeeId,
//         isSettled: false,
//       },
//     });

//     console.log('unsettledLoans:', unsettledLoans);
// if (unsettledLoans.length > 0) {
//   for (const loan of unsettledLoans) {
//     const paidInstallments = await prisma.payroll.count({
//       where: {
//         employeeId,
//         loanDeduction: {
//           gte: loan.amount / loan.installments!,
//         },
//       },
//     });

//     console.log(
//       'Paid Installments for Loan ID:',
//       loan.id,
//       'are',
//       paidInstallments
//     );

//     if (paidInstallments >= loan.installments!) {
//       // Calculate total unsettled loan instalments
//       loanDeduction += loan.amount;

//       // Update loan information
//       await prisma.loan.update({
//         where: {
//           id: loan.id,
//         },
//         data: {
//           isSettled: true,
//           settledAmount: loan.amount, // Mark full amount as settled
//           paidInstallments: loan.installments, // Mark all installments as paid
//         },
//       });
//     } else {
//       // Calculate partial unsettled loan instalments
//       const unsettledAmount =
//         (loan.amount / loan.installments!) * paidInstallments;
//       loanDeduction += unsettledAmount;

//       console.log('Unsettled Amount:', unsettledAmount);

//       // Update loan information
//       const updatedLoan = await prisma.loan.update({
//         where: {
//           id: loan.id,
//         },
//         data: {
//           settledAmount: unsettledAmount, // Mark partial amount as settled
//           paidInstallments,
//         },
//       });

//       console.log('Updated Loan:', updatedLoan);
//     }
//   }
// }

// console.log('loanDeduction:', loanDeduction);

//     const totalDeductions =
//       employeeEpfContribution + otherDeductions + salaryAdvance + loanDeduction;

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
//         otherAllowances: 0, // handle this value
//         epfDeduction: employeeEpfContribution,
//         companyEpfContribution,
//         companyEtfContribution,
//         salaryAdvance,
//         loanDeduction,
//         otherDeductions,
//         totalDeductions,
//         totalEarnings,
//         netSalary,
//         workingDays,
//         paidDays,
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
    workingDays,
    paidDays,
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

      // Mark salary advances as settled
      await prisma.salaryAdvance.updateMany({
        where: {
          employeeId,
          isSettled: false,
        },
        data: {
          isSettled: true,
        },
      });
    }

    // Fetch unsettled loans for the employee
    const unsettledLoans = await prisma.loan.findMany({
      where: {
        employeeId,
        isSettled: false,
      },
    });

    if (unsettledLoans.length > 0) {
      // Calculate loan installment amount
      const loanInstallment =
        unsettledLoans[0].amount / unsettledLoans[0].installments!;

      // Deduct loan installment from total deductions
      loanDeduction = loanInstallment;

      // Optionally update the loan record to track the paid installments
      await prisma.loan.update({
        where: {
          id: unsettledLoans[0].id,
        },
        data: {
          paidInstallments: unsettledLoans[0].paidInstallments! + 1,
          settledAmount: unsettledLoans[0].settledAmount! + loanInstallment,
          isSettled:
            unsettledLoans[0].paidInstallments! + 1 ===
            unsettledLoans[0].installments,
        },
      });
    }

    // calculate total deductions
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
        otherAllowances: 0, // handle this value
        epfDeduction: employeeEpfContribution,
        companyEpfContribution,
        companyEtfContribution,
        salaryAdvance,
        loanDeduction,
        otherDeductions,
        totalDeductions,
        totalEarnings,
        netSalary,
        workingDays,
        paidDays,
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
