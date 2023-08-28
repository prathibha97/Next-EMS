'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const AccountsPage = () => {
  const session = useSession()
  const router = useRouter()

  if(session.status === 'unauthenticated') {
    router.push('/')
  }
  console.log(session);
  return (
    <div>AccountsPage</div>
  )
}

export default AccountsPage