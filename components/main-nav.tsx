import Link from 'next/link';

import { NotificationButton } from '@/components/buttons/notification-button';
import { cn } from '@/lib/utils';
import { UserNav } from '../app/dashboard/components/user-nav';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        'flex items-center justify-between space-x-4 lg:space-x-6',
        className
      )}
      {...props}
    >
      <div className='flex items-center space-x-4'>
        <Link
          href='/organization/employees'
          className='text-sm font-medium transition-colors hover:text-primary'
        >
          Organization
        </Link>
        <Link
          href='/projects'
          className='text-sm font-medium transition-colors hover:text-primary'
        >
          Projects
        </Link>
        <Link
          href='/clients'
          className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
        >
          Clients
        </Link>
        <Link
          href='/accounts'
          className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
        >
          Accounts & Finance
        </Link>
        <Link
          href='/settings'
          className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
        >
          Settings
        </Link>
      </div>
      <div className='flex items-center space-x-4'>
        {/* <Search /> */}
        <NotificationButton />
        <UserNav />
      </div>
    </nav>
  );
}
