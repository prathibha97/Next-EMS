'use client';
import { TaskWorkWithTaskWithProjectWithClient } from '@/types';
import { FC, useState } from 'react';
import { AddTimeLogDialog } from './add-timelog';
import { columns } from './columns';
import { TimeSheetTable } from './time-sheet-table';

interface ViewTimeSheetProps {
  taskWork: TaskWorkWithTaskWithProjectWithClient[];
  employeeId: string;
}

const ViewTimeSheet: FC<ViewTimeSheetProps> = ({ taskWork, employeeId }) => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const filteredTaskWork = taskWork.filter((task) => {
    if (
      (selectedMonth === null || task.date.getMonth() + 1 === selectedMonth) &&
      (selectedYear === null || task.date.getFullYear() === selectedYear) &&
      (selectedDate === null ||
        task.date.toDateString() === selectedDate.toDateString())
    ) {
      return true;
    }
    return false;
  });

  const getUniqueYears = (
    taskWork: TaskWorkWithTaskWithProjectWithClient[]
  ) => {
    const uniqueYears = Array.from(
      new Set(taskWork.map((task) => task.date.getFullYear()))
    );
    return uniqueYears;
  };

  const uniqueYears = getUniqueYears(taskWork);

  // Calculate total hours
  const totalHours = filteredTaskWork.reduce(
    (acc, task) => acc + task.hoursWorked,
    0
  );

  return (
    <div className='bg-white dark:bg-gray-900/60 p-5 rounded-lg shadow'>
      <div className='flex justify-between'>
        <div>
          <label>Sort By Year</label>
          <select
            value={selectedYear || ''}
            onChange={(e) => setSelectedYear(Number(e.target.value) || null)}
            className='p-2 px-4 rounded-lg focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-slate-100 dark:bg-slate-400/60 text-sm ml-2'
          >
            <option value=''>All Years</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Sort By Date</label>
          <input
            type='date'
            value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className='p-2 px-4 rounded-lg focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-slate-100 dark:bg-slate-400/60 text-sm ml-2'
          />
        </div>

        <AddTimeLogDialog employeeId={employeeId} />
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
