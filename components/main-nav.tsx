'use client';

import Link from 'next/link';

import { UserNav } from '@/app/(routes)/dashboard/components/user-nav';
import { Icons } from '@/components/icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useIdleSignOut } from '@/hooks/useIdleSignOut';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { NotificationButton } from './buttons/notification-button';
import { ModeToggle } from './buttons/theme-toggle-button';

export function MainNav({ className }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const { data: session } = useSession();
  const homepage = pathname === '/';

  useIdleSignOut();

  return (
    <div
      className={`flex flex-col md:flex-row w-full mt-2 px-4 md:pl-8 ${
        homepage && 'hidden'
      }`}
    >
      {session?.user?.role === 'ADMIN' && (
        <div className='z-40 hidden md:block'>
          <NavigationMenu className={className}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Organization</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                    <li className='row-span-3'>
                      <NavigationMenuLink asChild>
                        <a
                          className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                          href='/dashboard'
                        >
                          <Icons.logo className='h-6 w-6' />
                          <div className='mb-2 mt-4 text-lg font-medium'>
                            Organization Management System
                          </div>
                          <p className='text-xs text-gray-600 leading-tight text-muted-foreground '>
                            View and Manage Organization Details.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem
                      href='/organization/employees'
                      title='Employees'
                      className='hover:bg-slate-50 dark:hover:bg-gray-700 '
                    >
                      <p className='text-xs text-gray-600'>
                        Add, View and Manage Organization Employees.
                      </p>
                    </ListItem>
                    <ListItem
                      href='/organization/departments'
                      title='Departments'
                      className='hover:bg-slate-50 dark:hover:bg-gray-700'
                    >
                      <p className='text-xs text-gray-600'>
                        Add, View and Manage Organization Departments.
                      </p>
                    </ListItem>
                    <ListItem
                      href='/organization/leaves'
                      title='Leaves'
                      className='hover:bg-slate-50 dark:hover:bg-gray-700'
                    >
                      <p className='text-xs text-gray-600'>
                        View, approve and Manage Employee Leave request.
                      </p>
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid gap-3 p-4 md:w-[400px] md:grid-cols-1 lg:w-[500px] '>
                    <ListItem
                      href='/projects/new'
                      title='Create New Project'
                      className='hover:bg-slate-50 dark:hover:bg-gray-700 '
                    >
                      <p className='text-xs text-gray-600'>
                        Create a new project and add employees, departments and
                        tasks.
                      </p>
                    </ListItem>
                    <ListItem
                      href='/projects'
                      title='View Projects'
                      className='hover:bg-slate-50 dark:hover:bg-gray-700'
                    >
                      <p className='text-xs text-gray-600'>
                        View all projects that are currently active and in
                        progress.
                      </p>
                    </ListItem>
                    <ListItem
                      href='/projects/tasks'
                      title='Manage Tasks'
                      className='hover:bg-slate-50 dark:hover:bg-gray-700'
                    >
                      <p className='text-xs text-gray-600'>
                        Manage tasks related to projects.
                      </p>
                    </ListItem>

                    <ListItem
                      href='/timesheet-admin'
                      title='View Timesheet'
                      className='hover:bg-slate-50 dark:hover:bg-gray-700'
                    >
                      <p className='text-xs text-gray-600'>
                        View timesheet data.
                      </p>
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Clients</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid gap-3 p-4 md:w-[400px] md:grid-cols-1 lg:w-[500px] '>
                    <ListItem
                      href='/clients/new'
                      title='Add New Client'
                      className='hover:bg-slate-50 dark:hover:bg-gray-700'
                    >
                      <p className='text-xs text-gray-600'>
                        Add a new client to the organization.
                      </p>
                    </ListItem>
                    <ListItem
                      href='/clients'
                      title='View Clients'
                      className='hover:bg-slate-50 dark:hover:bg-gray-700'
                    >
                      <p className='text-xs text-gray-600'>
                        View all clients and manage their details.
                      </p>
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Accounts & Finance
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid gap-3 p-4 md:w-[400px] md:grid-cols-1 lg:w-[500px] '>
                    <ListItem
                      href='/accounts/payroll'
                      title='Manage Payroll'
                      className='hover:bg-slate-50 dark:hover:bg-gray-700'
                    >
                      <p className='text-xs text-gray-600'>
                        Manage Payroll and salary information for all employees.
                      </p>
                    </ListItem>
                    <ListItem
                      href='/accounts/invoices'
                      title='Manage Invoices'
                      className='hover:bg-slate-50 dark:hover:bg-gray-700'
                    >
                      <p className='text-xs text-gray-600'>
                        Manage Invoices and billing information for all clients.
                      </p>
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href='/settings' legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Settings
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
      <div
        className={cn(
          'flex items-center space-x-4 ',
          session?.user.role === 'USER'
            ? 'justify-end ml-auto'
            : 'justify-between ml-auto'
        )}
      >
        <NotificationButton />
        {/* <ModeToggle /> */}
        <UserNav />
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
