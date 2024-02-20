'use client';

import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
// import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useLocalStorage } from 'usehooks-ts';
import { NavItem } from './board-nav-item';
import { Project } from '@prisma/client';
import { useParams } from 'next/navigation';

interface SidebarProps {
  storageKey?: string;
  projects: Project[];
}
export const BoardSidebar = ({
  storageKey = 't-sidebar-state',
  projects,
}: SidebarProps) => {
  const params = useParams();
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );
  // const { organization: activeOrganization, isLoaded: isLoadedOrg } =
  //   useOrganization();
  // const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
  //   userMemberships: {
  //     infinite: true,
  //   },
  // });

  const defaultAccordianValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  // if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
  //   return (
  //     <>
  //       <div className='flex items-center justify-between mb-2'>
  //         <Skeleton className='h-10 w-[50%]' />
  //         <Skeleton className='h-10 w-10' />
  //       </div>
  //       <div className='space-y-2'>
  //         <NavItem.Skeleton />
  //         <NavItem.Skeleton />
  //         <NavItem.Skeleton />
  //       </div>
  //     </>
  //   );
  // }
  return (
    <>
      <div className="font-medium text-md flex items-center mb-3 bg-white rounded-md p-2">
        <span className="pl-4">Projects</span>
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          <Link href="/projects/new">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordianValue}
        className="space-y-5 bg-white p-5 rounded-md"
      >
        {projects.map((project) => (
          <NavItem
            key={project.id}
            isActive={params?.projectId === project.id}
            isExpanded={expanded[project.id]}
            project={project}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  );
};
