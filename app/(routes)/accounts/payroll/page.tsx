'use client';
import { useGetEmployeesQuery } from '@/app/redux/services/employeeApi';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { columns } from './components/columns';
import { PayrollDataTable } from './components/payroll-data-table';
import Loading from './loading';

interface PayrollsPageProps {}

const PayrollsPage: FC<PayrollsPageProps> = ({}) => {
  const [data, setData] = useState([]);

  const { data: employeeData, isLoading, refetch } = useGetEmployeesQuery();

  useEffect(() => {
    if (employeeData) {
      // @ts-ignore
      setData(employeeData);
    }
  }, [employeeData]);

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return <Loading/>;
  }
  return (
    <div>
      <PayrollDataTable columns={columns} data={data} />
    </div>
  );
};

export default PayrollsPage;
