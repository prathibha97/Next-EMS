'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react'

interface PayrollEditPageProps {
  params:{
    payrollId: string
  }
}

const PayrollEditPage: FC<PayrollEditPageProps> = ({params}) => {
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
  return <div>PayrollEditPage</div>
}

export default PayrollEditPage