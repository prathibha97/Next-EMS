'use client';
import { sidebarItems } from '@/constants/sidebarItems';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const homepage = pathname === '/';
  return (
    <div className={`hidden md:flex ${homepage && 'hidden'}`}>
      <div className='flex flex-col h-screen p-3 bg-gray-50 shadow w-60 dark:bg-gray-900 dark:text-gray-50'>
        <div className='flex items-center'>
          <h2 className='text-xl font-bold'>Dashboard</h2>
        </div>
        <div className='flex-1 mt-4'>
          <ul className='space-y-1 text-sm'>
            {sidebarItems.map((item) => (
              <li
                className={`rounded-sm ${
                  pathname === item.link ? 'bg-muted dark:text-black' : ''
                }`}
                key={item.name}
              >
                <Link
                  href={item.link}
                  className={`flex items-center p-2 space-x-3 rounded-md ${
                    pathname === item.link
                      ? 'bg-gray-300 font-semibold'
                      : 'hover:bg-gray-200 hover:dark:bg-gray-700'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='mt-auto'>
          <Button
            className='flex items-center p-2 space-x-3 rounded-md w-full'
            onClick={() => {
              signOut();
              router.push('/');
            }}
          >
            <LogOut className='h-6 w-6' />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
