'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const OrganizationPage = () => {
  const { status, data } = useSession();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  if (status === 'unauthenticated') {
    router.push('/');
  } else if (data?.user?.role !== 'ADMIN') {
    router.push('/denied');
  }
  return <div>OrganizationPage</div>;
};

export default OrganizationPage;
