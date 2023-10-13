import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';

import ViewTasks from './components/view-tasks';
import { taskSchema } from './data/schema';
import useTasks from '@/hooks/useTasks';

// Simulate a database read for tasks.
// async function getTasks() {
//   const data = await fs.readFile(
//     path.join(process.cwd(), 'app/(routes)/tasks/data/tasks.json')
//   );

//   const tasks = JSON.parse(data.toString());

//   return z.array(taskSchema).parse(tasks);
// }

export default async function TaskPage() {
  // const tasks = await getTasks();
  const {getAllTasks} = useTasks()
  const tasks = await getAllTasks()

  return (
    <div>
      <ViewTasks tasks={tasks} />
    </div>
  );
}
