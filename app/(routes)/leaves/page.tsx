'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/');
    },
  });
  return <div>page</div>
}

export default page