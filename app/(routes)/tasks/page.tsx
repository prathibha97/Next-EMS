import { getAuthSession } from '@/app/api/auth/[...nextauth]/options';
import useTasks from '@/hooks/useTasks';
import ViewTasks from './components/view-tasks';

export default async function TaskPage() {
  const session = await getAuthSession();
  const { getTaskByUser } = useTasks();

  const tasks = await getTaskByUser(session?.user.id as string);

  return (
    <div>
      <ViewTasks tasks={tasks} />
    </div>
  );
}
