import prisma from './prisma';

interface IParams {
  employeeId?: string;
  employeeType?: 'Full Time' | 'Part Time' | 'Contractual' | 'Intern';
  gender?: 'Male' | 'Female';
}

type LeaveType =
  | 'Casual'
  | 'Annual'
  | 'Medical'
  | 'Maternity'
  | 'BroughtForward'
  | 'Duty'
  | 'Unpaid';

export const createDefaultLeaveBalances = async ({
  employeeId,
  employeeType,
  gender,
}: IParams) => {
  const defaultLeaveBalances = [];

  // Define leave type constants
  const LeaveTypeConst: Record<LeaveType, LeaveType> = {
    Casual: 'Casual',
    Annual: 'Annual',
    Medical: 'Medical',
    Maternity: 'Maternity',
    BroughtForward: 'BroughtForward',
    Duty: 'Duty',
    Unpaid: 'Unpaid',
  };

  // Calculate default leave balances based on employeeType and gender
  if (['Intern', 'Contractual', 'Part Time'].includes(employeeType)) {
    defaultLeaveBalances.push({
      leaveType: LeaveTypeConst.Casual,
      balance: 2,
      employeeId,
      employee: { connect: { id: employeeId } },
    });
    defaultLeaveBalances.push({
      leaveType: LeaveTypeConst.Annual,
      balance: 0,
      employeeId,
      employee: { connect: { id: employeeId } },
    });
    defaultLeaveBalances.push({
      leaveType: LeaveTypeConst.Medical,
      balance: 1,
      employeeId,
      employee: { connect: { id: employeeId } },
    });
  } else {
    defaultLeaveBalances.push({
      leaveType: LeaveTypeConst.Casual,
      balance: 7,
      employeeId,
      employee: { connect: { id: employeeId } },
    });
    defaultLeaveBalances.push({
      leaveType: LeaveTypeConst.Annual,
      balance: 7,
      employeeId,
      employee: { connect: { id: employeeId } },
    });
    defaultLeaveBalances.push({
      leaveType: LeaveTypeConst.Medical,
      balance: 7,
      employeeId,
      employee: { connect: { id: employeeId } },
    });
  }

  // Calculate Maternity leave balance based on gender
  if (gender === 'Female') {
    defaultLeaveBalances.push({
      leaveType: LeaveTypeConst.Maternity,
      balance: 7,
      employeeId,
      employee: { connect: { id: employeeId } },
    });
  } else {
    defaultLeaveBalances.push({
      leaveType: LeaveTypeConst.Maternity,
      balance: 0,
      employeeId,
      employee: { connect: { id: employeeId } },
    });
  }

  // Set default balances for other leave types (BroughtForward, Duty, Unpaid)
  defaultLeaveBalances.push(
    {
      leaveType: LeaveTypeConst.BroughtForward,
      balance: 0,
      employeeId,
      employee: { connect: { id: employeeId } },
    },
    {
      leaveType: LeaveTypeConst.Duty,
      balance: 0,
      employeeId,
      employee: { connect: { id: employeeId } },
    },
    {
      leaveType: LeaveTypeConst.Unpaid,
      balance: 0,
      employeeId,
      employee: { connect: { id: employeeId } },
    }
  );

  // Create the default leave balances in the database
  await prisma.leaveBalance.createMany({
    data: defaultLeaveBalances,
  });
};
