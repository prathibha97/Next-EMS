import { AddTaskDialog } from './add-task-dialog';
import { columns } from './columns';
import { DataTable } from './data-table';

interface ViewTasksProps {
  tasks: any;
}

export default function ViewTasks({ tasks }: ViewTasksProps) {
  return (
    <div className='space-y-5'>
      <AddTaskDialog />
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
