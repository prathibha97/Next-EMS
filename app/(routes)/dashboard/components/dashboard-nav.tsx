'use client'
import Link from 'next/link';

import { UserNav } from '@/app/(routes)/dashboard/components/user-nav';
import { NotificationButton } from '@/components/buttons/notification-button';
import { ModeToggle } from '@/components/buttons/theme-toggle-button';
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
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

export function DashboardNav({ className }: React.HTMLAttributes<HTMLElement>) {
  // const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   if (!isMounted) {
  //     setIsMounted(true);
  //   }
  // }, [isMounted]);

  // if (!isMounted) {
  //   return null;
  // }
  return (
    <div className={`flex justify-between`}>
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
                      href='/'
                    >
                      <Icons.logo className='h-6 w-6' />
                      <div className='mb-2 mt-4 text-lg font-medium'>
                        Organization Management System
                      </div>
                      <p className='text-sm leading-tight text-muted-foreground'>
                        View and Manage Organization Details.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem
                  href='/organization/employees'
                  title='Employees'
                  className='hover:bg-slate-50 dark:hover:bg-gray-700'
                >
                  Add, View and Manage Organization Employees.
                </ListItem>
                <ListItem
                  href='/organization/departments'
                  title='Departments'
                  className='hover:bg-slate-50 dark:hover:bg-gray-700'
                >
                  Add, View and Manage Organization Departments.
                </ListItem>
                <ListItem
                  href='/organization/leaves'
                  title='Leaves'
                  className='hover:bg-slate-50 dark:hover:bg-gray-700'
                >
                  View, approve and Manage Employee Leave request.
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
                  className='hover:bg-slate-50 dark:hover:bg-gray-700'
                >
                  Create a new project and add employees, departments and tasks.
                </ListItem>
                <ListItem
                  href='/projects'
                  title='View Projects'
                  className='hover:bg-slate-50 dark:hover:bg-gray-700'
                >
                  View all projects that are currently active and in progress.
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
                  Add a new client to the organization.
                </ListItem>
                <ListItem
                  href='/clients'
                  title='View Clients'
                  className='hover:bg-slate-50 dark:hover:bg-gray-700'
                >
                  View all clients and manage their details.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Accounts & Finance</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid gap-3 p-4 md:w-[400px] md:grid-cols-1 lg:w-[500px] '>
                <ListItem
                  href='/accounts/payroll'
                  title='Manage Payroll'
                  className='hover:bg-slate-50 dark:hover:bg-gray-700'
                >
                  Manage Payroll and salary information for all employees.
                </ListItem>
                <ListItem
                  href='/accounts/invoices'
                  title='Manage Invoices'
                  className='hover:bg-slate-50 dark:hover:bg-gray-700'
                >
                  Manage Invoices and billing information for all clients.
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
      <div className='flex items-center space-x-2'>
        {/* <Search /> */}
        <NotificationButton />
        <ModeToggle />
        <UserNav />{' '}
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
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
