import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Project } from '@prisma/client';
import { Activity, Briefcase, Layout } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export type Organization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

interface NavItemProps {
  isExpanded: boolean;
  isActive: boolean;
  project: Project;
  onExpand: (id: string) => void;
}

export const NavItem = ({
  isActive,
  isExpanded,
  onExpand,
  project,
}: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const onClick = (href: string) => {
    router.push(href);
  };

  const routes = [
    {
      label: 'Boards',
      icon: <Layout className='h-4 w-4 mr-2' />,
      href: `/projects/${project.id}/boards`,
    },
    {
      label: 'Activity',
      icon: <Activity className='h-4 w-4 mr-2' />,
      href: `/projects/${project.id}/activity`,
    },
    // {
    //   label: 'Settings',
    //   icon: <Settings className='h-4 w-4 mr-2' />,
    //   href: `/organization/${project.id}/settings`,
    // },
    // {
    //   label: 'Billing',
    //   icon: <CreditCard className='h-4 w-4 mr-2' />,
    //   href: `/organization/${project.id}/billing`,
    // },
  ];
  return (
    <AccordionItem value={project.id} className='border-none w-full'>
      <AccordionTrigger
        onClick={() => onExpand(project.id)}
        className={cn(
          'flex items-center mt-1 gap-x-2 p-1.5 text-neutral-700 rounded-md justify-between w-full hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline',
          isActive && !isExpanded && 'bg-sky-500/10 text-sky-700'
        )}
      >
        <div className='flex items-center justify-between gap-x-2'>
          <div className='w-7 h-7 relative'>
            <Briefcase />
          </div>
          <span className='font-medium text-sm'>{project.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className='pt-1 text-neutral-700'>
        {routes.map((route) => (
          <Button
            key={route.href}
            size='sm'
            onClick={() => onClick(route.href)}
            className={cn(
              'w-full font-normal justify-start pl-10 mb-1',
              pathname === route.href && 'bg-sky-500/10 text-sky-700'
            )}
            variant='ghost'
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className='flex items-center gap-x-2'>
      <div className='w-10 h-10 relative shrink-0'>
        <Skeleton className='h-full w-full absolute' />
      </div>
      <Skeleton className='h-10 w-full' />
    </div>
  );
};
