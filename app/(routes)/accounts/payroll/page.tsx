'use client';
import { useGetEmployeesQuery } from '@/app/redux/services/employeeApi';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { columns } from './components/columns';
import { PayrollDataTable } from './components/payroll-data-table';

interface PayrollsPageProps {}

const PayrollsPage: FC<PayrollsPageProps> = ({}) => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/');
    },
  });
  useEffect(() => {
    if (session && session?.user?.role !== 'ADMIN') {
      router.push('/denied');
    }
  }, [session]);

  const { data: employeeData, isLoading, refetch } = useGetEmployeesQuery();
  const [data, setData] = useState([]);

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
    return <div>Loading...</div>;
  }
  return (
    <div>
      <PayrollDataTable columns={columns} data={data} />
    </div>
  );
};

export default PayrollsPage;
