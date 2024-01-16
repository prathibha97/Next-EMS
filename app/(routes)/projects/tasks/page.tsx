import useTasks from '@/hooks/useTasks';
import ViewTasks from './components/view-tasks';

export default async function TaskPage() {
  const { getAllTasks } = useTasks();
  const tasks = await getAllTasks();

  return (
    <div>
      <ViewTasks tasks={tasks} />
    </div>
  );
}
