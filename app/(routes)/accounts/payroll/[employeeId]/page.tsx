'use client';
import { useGetPayrollByEmployeeIdQuery } from '@/app/redux/services/payrollApi';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { columns } from './components/columns';
import { PaySheetDataTable } from './components/paysheet-table';
import Loading from './loading';

interface PayrollPageProps {
  params: {
    employeeId: string;
  };
}

const PayrollPage: FC<PayrollPageProps> = ({ params }) => {
  const { employeeId } = params;
  const router = useRouter();
  const [data, setData] = useState([]);

  const {
    data: paysheetData,
    isLoading,
    refetch,
  } = useGetPayrollByEmployeeIdQuery(employeeId);

  useEffect(() => {
    if (paysheetData) {
      // @ts-ignore
      setData(paysheetData);
    }
  }, [paysheetData]);

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Button
        onClick={() => router.push(`/accounts/payroll/${employeeId}/new`)}
      >
        Add Salary
      </Button>
      <PaySheetDataTable data={data} columns={columns} />
      <Button type='button' onClick={() => router.push('/accounts/payroll')}>
        Go Back
      </Button>
    </div>
  );
};

export default PayrollPage;
