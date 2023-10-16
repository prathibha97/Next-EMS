'use client';
import { filterTaskWorkByMonth } from '@/lib/filterTaskWorkByMonth';
import { TaskWorkWithTaskWithProjectWithClient } from '@/types';
import { FC, useState } from 'react';
import { AddTimeLogDialog } from './add-timelog';
import { columns } from './columns';
import { TimeSheetTable } from './time-sheet-table';

interface ViewTimeSheetProps {
  taskWork: TaskWorkWithTaskWithProjectWithClient[];
  employeeId:string;
}

const ViewTimeSheet: FC<ViewTimeSheetProps> = ({ taskWork,employeeId }) => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const filteredTaskWork = selectedMonth
    ? filterTaskWorkByMonth(taskWork, selectedMonth)
    : taskWork;

  // Calculate total hours
  const totalHours = filteredTaskWork.reduce(
    (acc, task) => acc + task.hoursWorked,
    0
  );

  return (
    <div className='bg-white dark:bg-gray-900/60 p-5 rounded-lg shadow'>
      <div className='flex justify-between'>
        <select
          value={selectedMonth || ''}
          onChange={(e) => setSelectedMonth(Number(e.target.value) || null)}
          className='p-2 px-4 rounded-lg focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-slate-100 dark:bg-slate-400/60 text-sm'
        >
          <option value=''>All Months</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month}>
              {new Date(2023, month - 1, 1).toLocaleString('default', {
                month: 'long',
              })}
            </option>
          ))}
        </select>

        <AddTimeLogDialog employeeId={employeeId}/>
      </div>

      <TimeSheetTable
        columns={columns}
        data={filteredTaskWork}
        searchFilter='date'
        placeholder='Date'
      />

      <div className='mt-4 text-xl font-bold'>
        Total Hours Worked: {totalHours} hours
      </div>
    </div>
  );
};

export default ViewTimeSheet;
