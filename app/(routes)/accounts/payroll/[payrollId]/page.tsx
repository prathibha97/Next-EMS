'use client';
import { Button } from '@/components/ui/button';
import { payslipsData } from '@/constants/sample/payslip-data';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { columns } from './components/columns';
import { PaySheetDataTable } from './components/paysheet-table';

interface PayrollPageProps {
  params: {
    payrollId: string;
  };
}

const PayrollPage: FC<PayrollPageProps> = ({ params }) => {
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
      <Button onClick={() => router.push('/accounts/payroll/new')}>
        Add Salary
      </Button>
      <PaySheetDataTable data={payslipsData} columns={columns} />
    </div>
  );
};

export default PayrollPage;
