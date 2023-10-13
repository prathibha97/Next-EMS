'use client';

import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { DataTable } from './data-table';

interface ViewTasksProps {
  tasks: any;
}

export default function ViewTasks({ tasks }: ViewTasksProps) {
  const router = useRouter();
  const { data } = useSession();
  const isAdmin = data?.user.role === 'ADMIN';
  return (
    <>
      <div>
        <div className='flex items-center justify-between space-y-2'>
          {isAdmin && (
            <Button onClick={() => router.push('/tasks/new')} className='mb-5'>
              Create New Task
            </Button>
          )}
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
}
