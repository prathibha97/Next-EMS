import useTasks from '@/hooks/useTasks';
import { FC } from 'react';
import TaskEditForm from './components/task-edit-form';
import { Task } from '@prisma/client';

interface pageProps {
  params: {
    taskId: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const { getTaskById } = useTasks();
  // @ts-ignore
  const task:Task = await getTaskById(params.taskId);
  return (
    <div className='w-[600px]'>
      <TaskEditForm task={task} />
    </div>
  );
};

export default page;
