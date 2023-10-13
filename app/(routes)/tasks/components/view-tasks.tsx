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
      <div className='container h-full flex-1 flex-col space-y-6 p-4 md:flex'>
        <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          {isAdmin && (
            <Button onClick={() => router.push('/tasks/new')}>
              Create New Task
            </Button>
          )}
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
}
