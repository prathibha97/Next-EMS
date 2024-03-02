import { DataTable } from '@/components/data-table';
import { columns } from './components/columns';
import useEmployee from '@/hooks/useEmployee';
import prisma from '@/lib/prisma';
import ApplyLeaveForm from './components/apply-leave-form';
import LeaveBalance from './components/leave-balance';
import { Employee, LeaveBalance as LeaveBalanceType } from '@prisma/client';

export const revalidate = 0;

type EmployeeWithLeaveBalance = Employee & {
  leaveBalance: LeaveBalanceType;
};

const ApplyLeavePage = async () => {
  const { getLoggedInEmployee } = useEmployee();
  const currentEmployee = await getLoggedInEmployee();

  const leaves = await prisma.leave.findMany({
    where: {
      employeeId: currentEmployee?.id,
    },
    orderBy:{
      createdAt: 'desc'
    }
  });

  return (
    <div>
      <ApplyLeaveForm currentEmployee={currentEmployee as Employee} />
      <LeaveBalance currentEmployee={currentEmployee as EmployeeWithLeaveBalance} />
      <DataTable
        columns={columns}
        data={leaves}
        placeholder='Date'
        searchFilter='createdAt'
      />
    </div>
  );
};

export default ApplyLeavePage;
