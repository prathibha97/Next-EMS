import { EmployeeWithLeaveBalance } from '@/types';
import calculateBroughtForwardLeaves from './calculateBroughtForwardLeaves';
import prisma from './prisma';

const updateLeaveBalances = async () => {
  try {
    // Get all employees
    // @ts-ignore
    const employees: (EmployeeWithLeaveBalance | null)[] =
      await prisma.employee.findMany({
        include: { leaveBalance: true },
      });

    // Iterate through each employee and update their leave balances
    for (const employee of employees) {
      if (!employee || !employee.leaveBalance) {
        console.error(`Employee ${employee?.id} has no leave balance.`);
        continue; // Skip to the next employee
      }

      // Update the brought forward leaves
      const broughtForwardLeaves = await calculateBroughtForwardLeaves(
        employee
      );
      employee.leaveBalance.broughtForward = broughtForwardLeaves;

      // Reset other leave balances to default values at the start of every new year
      const currentYear = new Date().getFullYear().toString();

      const getDefaultCasualLeaveBalance = (workType: string) => {
        if (['intern', 'contractual', 'partTime'].includes(workType)) {
          return 2;
        }
        return 7;
      };

      const getDefaultAnnualLeaveBalance = (workType: string) => {
        if (['intern', 'contractual', 'partTime'].includes(workType)) {
          return 0;
        }
        return 7;
      };

      const getDefaultMedicalLeaveBalance = (workType: string) => {
        if (['intern', 'contractual', 'partTime'].includes(workType)) {
          return 1;
        }
        return 7;
      };

      if (employee.startDate?.toISOString().startsWith(currentYear)) {
        employee.leaveBalance.casual = getDefaultCasualLeaveBalance(
          employee.employeeType as string
        );
        employee.leaveBalance.annual = getDefaultAnnualLeaveBalance(
          employee.employeeType as string
        );

        employee.leaveBalance.medical = getDefaultMedicalLeaveBalance(
          employee.employeeType as string
        );
      }

      await prisma.employee.update({
        where: { id: employee.id },
        data: {
          leaveBalance: {
            update: {
              broughtForward: employee.leaveBalance.broughtForward,
              casual: employee.leaveBalance.casual,
              annual: employee.leaveBalance.annual,
              medical: employee.leaveBalance.medical,
            },
          },
        },
      });
    }

    console.log('Leave balances updated successfully.');
  } catch (err: any) {
    console.error('Failed to update leave balances:', err.message);
  }
};

export default updateLeaveBalances;
