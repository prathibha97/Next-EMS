'use client';
import { Button } from '@/components/ui/button';
import { Project } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { columns } from './columns';
import { DataTable } from './data-table';

interface ViewProjectsProps {
  projects: Project[];
}

const ViewProjects: FC<ViewProjectsProps> = ({ projects }) => {
  const router = useRouter();
  return (
    <div>
      <Button className='mb-5' onClick={() => router.push('/projects/new')}>
        Create New Project
      </Button>
      <DataTable data={projects} columns={columns} />
    </div>
  );
};

export default ViewProjects;
