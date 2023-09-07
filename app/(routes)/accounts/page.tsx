'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const AccountsPage = () => {
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
    <div>AccountsPage</div>
  )
}

export default AccountsPage