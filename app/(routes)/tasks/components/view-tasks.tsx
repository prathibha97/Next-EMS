import { getAuthSession } from '@/app/api/auth/[...nextauth]/options';
import { AddTaskDialog } from './add-task-dialog';
import { columns } from './columns';
import { DataTable } from './data-table';

interface ViewTasksProps {
  tasks: any;
}

export default async function ViewTasks({ tasks }: ViewTasksProps) {
  const session = await getAuthSession();
  const isAdmin = session?.user.role === 'ADMIN';

  return (
    <>
      <div className='container h-full flex-1 flex-col space-y-6 p-5 md:flex'>
        <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your tasks assigned for the projects!
            </p>
          </div>
          {isAdmin && <AddTaskDialog />}
        </div>
        <div className='bg-white dark:bg-gray-900/60 p-5 rounded-lg shadow'>
        <DataTable data={tasks} columns={columns} />
        </div>
      </div>
    </>
  );
}
