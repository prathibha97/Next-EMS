import useTasks from '@/hooks/useTasks';
import { Task } from '@prisma/client';
import { FC } from 'react';
import TaskEditForm from './components/task-edit-form';

interface pageProps {
  params: {
    taskId: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const { getTaskById } = useTasks();
  // @ts-ignore
  const task: Task = await getTaskById(params.taskId);
  return (
    <div className='h-full w-[600px] md:w-full'>
      <TaskEditForm task={task} />
    </div>
  );
};

export default page;
