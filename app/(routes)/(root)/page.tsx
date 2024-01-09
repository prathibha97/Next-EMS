'use client';
import { UserAuthForm } from '@/app/(routes)/(root)/components/user-auth-form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ADMIN_ROLE = 'ADMIN';
const USER_ROLE = 'USER';
const DASHBOARD_PATH = '/dashboard';
const PROFILE_PATH = '/profile';

const redirectToRolePage = (role: string, router: any) => {
  switch (role) {
    case ADMIN_ROLE:
      router.push(DASHBOARD_PATH);
      break;
    case USER_ROLE:
      router.push(PROFILE_PATH);
      break;
    default:
      // Redirect to a default path or handle other cases
      break;
  }
};

export default function AuthenticationPage() {
  const router = useRouter();
  const { status, data: session } = useSession();

  // useEffect(() => {
  //   if (status === 'authenticated' && session?.user) {
  //     redirectToRolePage(session.user.role, router);
  //   }
  // }, [status, session, router]);

  return (
    <div className='h-screen'>
      <div className='container relative h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
          <div className='absolute inset-0 bg-zinc-900' />
          <div className='relative z-20 flex items-center text-lg font-medium'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-2 h-6 w-6'
            >
              <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
            </svg>
            Sphiria Digital Studio
          </div>
          <div className='relative z-20 mt-auto lg:w-[1224px]'>
            <blockquote className='space-y-2'>
              <p className='text-lg'>
                &ldquo;Success is not final, failure is not fatal: It is the
                courage to continue that counts.&rdquo;
              </p>
              <footer className='text-sm'>Winston Churchill</footer>
            </blockquote>
          </div>
        </div>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </div>
  );
}
