import { AddTaskDialog } from './add-task-dialog';
import { columns } from './columns';
import { DataTable } from './data-table';

interface ViewTasksProps {
  tasks: any;
}

export default function ViewTasks({ tasks }: ViewTasksProps) {
  return (
    <div className='space-y-3'>
      <AddTaskDialog />
      <div className='bg-white dark:bg-gray-900/60 p-5 rounded-lg shadow'>
        <DataTable data={tasks} columns={columns} />
      </div>
    </div>
  );
}
