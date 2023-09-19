import LinkButton from '@/components/buttons/link-button';
import prisma from '@/lib/prisma';
import { FC } from 'react';
import { columns } from './components/columns';
import { PaySheetDataTable } from './components/paysheet-table';
import usePayroll from '@/hooks/usePayroll';

interface PayrollPageProps {
  params: {
    employeeId: string;
  };
}

const PayrollPage: FC<PayrollPageProps> = async ({ params }) => {
  const { employeeId } = params;

  const {getPayrollByEmployee} =usePayroll();
  const payrolls = await getPayrollByEmployee(employeeId);

  return (
    <div>
      <LinkButton
        link={`/accounts/payroll/${employeeId}/new`}
        label='Add Salary'
      />

      <PaySheetDataTable data={payrolls} columns={columns} />
      <LinkButton link={`/accounts/payroll`} label='Go Back' />
    </div>
  );
};

export default PayrollPage;
