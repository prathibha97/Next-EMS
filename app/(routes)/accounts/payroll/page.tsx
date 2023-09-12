'use client';
import { payrollData } from '@/constants/sample/payroll-data';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
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
  return (
    <div>
      <PayrollDataTable columns={columns} data={payrollData} />
    </div>
  );
};

export default PayrollsPage;
