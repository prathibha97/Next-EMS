'use client';

import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
// import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import { Project } from '@prisma/client';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLocalStorage } from 'usehooks-ts';
import { NavItem } from './board-nav-item';

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

  return (
    <>
      <div className='font-medium text-md flex items-center w-full mb-3 bg-white rounded-md p-2'>
        <span className='pl-4'>Projects</span>
        <Button
          asChild
          type='button'
          size='icon'
          variant='ghost'
          className='ml-auto'
        >
          <Link href='/projects/new'>
            <Plus className='h-4 w-4' />
          </Link>
        </Button>
      </div>
      <div className='w-full'>
        <Accordion
          type='multiple'
          defaultValue={defaultAccordianValue}
          className='space-y-5 bg-white p-5 rounded-md'
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
      </div>
    </>
  );
};
