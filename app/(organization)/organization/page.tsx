'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const OrganizationPage = () => {
  const router = useRouter();
  const { status, data } = useSession();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (data?.user?.role !== 'ADMIN') {
      router.push('/denied');
    }
  }, [router, status, data]);

    if (!isMounted) {
      return null;
    }

  return <div>OrganizationPage</div>;
};

export default OrganizationPage;
