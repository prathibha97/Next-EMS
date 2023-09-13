'use client';
import { Button } from '@/components/ui/button';
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
      {/* <div className='flex justify-between'>
        <h1 className='text-2xl font-semibold mb-8'>Payroll Management</h1>
        <Button onClick={() => router.push('/accounts/payroll/new')}>
          Create New Payroll
        </Button>
      </div> */}
      <PayrollDataTable columns={columns} data={payrollData} />
    </div>
  );
};

export default PayrollsPage;
