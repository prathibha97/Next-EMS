'use client';
import { sidebarItems } from '@/constants/sidebarItems';
import { LogOut, SlidersHorizontal } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { useAppDispatch } from '@/app/redux/hooks';
import { setLogout } from '@/app/redux/features/authSlice';
import { useEffect, useState } from 'react';
import MainNavResponsive from './main-nav-responsive';

const ResponsiveSidebar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const homepage = pathname === '/';

  // Determine whether to apply the md:flex class based on homepage
  const sidebarClass = homepage ? 'hidden' : 'md:flex';

  return (
    <div className={`${sidebarClass} overflow-y-auto`}>
      <div className="flex flex-col h-screen p-3 bg-gray-50 shadow w-full dark:bg-gray-900 dark:text-gray-50">
        <div className="flex items-center">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>
        <div className="flex-1 mt-4">
          <ul className="space-y-1 text-sm">
            {sidebarItems.map((item) =>
              item.name === 'Home' && session?.user.role !== 'ADMIN' ? null : (
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
              )
            )}
            <MainNavResponsive />
            <li>
              <Link
                className="flex items-center p-3 -mt-5 gap-2 space-x-3 rounded-md"
                href={'/settings'}
              >
                <SlidersHorizontal className="h-6 w-6" /> Settings
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-auto mb-8">
          <Button
            className="flex items-center p-2 space-x-3 rounded-md w-full"
            onClick={() => {
              router.push('/');
              signOut();
              dispatch(setLogout());
            }}
          >
            <LogOut className="h-6 w-6" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveSidebar;
