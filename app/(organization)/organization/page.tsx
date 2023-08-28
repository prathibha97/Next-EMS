'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const OrganizationPage = () => {
  const router = useRouter();
  const { status, data } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (data?.user?.role !== 'ADMIN') {
      router.push('/denied');
    }
  }, [router, status, data]);

  return <div>OrganizationPage</div>;
};

export default OrganizationPage;
