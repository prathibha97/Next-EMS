import { EmployeeWithLeaveBalance } from '@/types';
import { Employee, LeaveBalance } from '@prisma/client';

const calculateBroughtForwardLeaves = async (
  employee: EmployeeWithLeaveBalance
) => {
  let broughtForwardLeaves = 0;

  if (
    employee.employeeType !== 'intern' &&
    employee.employeeType !== 'contractual' &&
    employee.employeeType !== 'partTime'
  ) {
    const annualLeaves = employee.leaveBalance.annual;
    const maximumBroughtForwardLeaves = 4;

    broughtForwardLeaves = Math.min(annualLeaves, maximumBroughtForwardLeaves);
  }

  return broughtForwardLeaves;
};

export default calculateBroughtForwardLeaves;
