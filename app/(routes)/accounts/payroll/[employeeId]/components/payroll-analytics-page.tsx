import useEmployee from '@/hooks/useEmployee';
import { FC } from 'react';
import PayrollAnalytics from './payroll-analytics';
import { EmployeeWithPayroll } from '@/types';

interface PayrollAnalyticsPageProps {
  employeeId: string;
}

const PayrollAnalyticsPage: FC<PayrollAnalyticsPageProps> = async({
  employeeId,
}) => {
  const { getEmployeeById } = useEmployee();
  // @ts-ignore
  const employee: EmployeeWithPayroll = await getEmployeeById(employeeId);
  return (
    <div>
      <PayrollAnalytics employee={employee} />
    </div>
  );
};

export default PayrollAnalyticsPage;
