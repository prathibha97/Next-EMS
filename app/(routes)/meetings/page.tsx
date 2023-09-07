'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const MeetingsPage = () => {
const router = useRouter();
const { data: session } = useSession({
  required: true,
  onUnauthenticated() {
    router.push('/');
  },
});
  return <div>MeetingsPage</div>;
};

export default MeetingsPage;
