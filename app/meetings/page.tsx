'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const MeetingsPage = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === 'unauthenticated') {
    router.push('/');
  }
  return <div>MeetingsPage</div>;
};

export default MeetingsPage;
