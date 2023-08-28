'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface OrganizationSidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function OrganizationSidebarNav({ className, items, ...props }: OrganizationSidebarNavProps) {
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        'flex items-center justify-center space-x-2 lg:space-x-0 lg:space-y-1 mb-2',
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname.startsWith(item.href)
              ? 'bg-slate-100 hover:bg-slate-200'
              : 'hover:bg-transparent hover:underline',
            'justify-start'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
