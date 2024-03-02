'use client';
import { TaskWorkWithTaskWithProjectWithClient } from '@/types';
import { FC, useState } from 'react';
import { columns } from './columns';
import { TimeSheetTable } from './time-sheet-table';

interface ViewTimeSheetProps {
  taskWork: TaskWorkWithTaskWithProjectWithClient[];
}

const ViewTimeSheet: FC<ViewTimeSheetProps> = ({ taskWork }) => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  const filteredTaskWork = taskWork.filter((task) => {
    if (
      (selectedMonth === null || task.date.getMonth() + 1 === selectedMonth) &&
      (selectedYear === null || task.date.getFullYear() === selectedYear) &&
      (selectedDate === null ||
        task.date.toDateString() === selectedDate.toDateString()) &&
      (selectedEmployee === null || task.employee.name === selectedEmployee)
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

  const getUniqueMonths = (
    taskWork: TaskWorkWithTaskWithProjectWithClient[],
    selectedYear: number | null
  ) => {
    const filteredMonths = taskWork
      .filter(
        (task) =>
          selectedYear === null || task.date.getFullYear() === selectedYear
      )
      .map((task) =>
        new Date(task.date).toLocaleString('default', { month: 'long' })
      );

    const uniqueMonths = Array.from(new Set(filteredMonths));
    return uniqueMonths;
  };

  const getUniqueEmployees = (
    taskWork: TaskWorkWithTaskWithProjectWithClient[]
  ) => {
    const uniqueEmployees = Array.from(
      new Set(taskWork.map((task) => task.employee.name))
    );
    return uniqueEmployees;
  };

  const uniqueYears = getUniqueYears(taskWork);
  const uniqueMonths = getUniqueMonths(taskWork, selectedYear);
  const uniqueEmployees = getUniqueEmployees(taskWork);

  // Calculate total hours
  const totalHours = filteredTaskWork.reduce(
    (acc, task) => acc + task.hoursWorked,
    0
  );

  return (
    <div className='bg-white dark:bg-gray-900/60 p-5 rounded-lg shadow'>
      <div className='flex flex-col md:flex-row justify-between md:items-center gap-3'>
        <div>
          <label className='text-sm'>Sort By Year</label>
          <select
            value={selectedYear || ''}
            onChange={(e) => setSelectedYear(Number(e.target.value) || null)}
            className='p-2 px-4 w-full rounded-md focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-slate-100 dark:bg-slate-400/60 text-sm'
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
          <label className='text-sm'>Sort By Month</label>
          <select
            value={selectedMonth || ''}
            onChange={(e) => setSelectedMonth(Number(e.target.value) || null)}
            className='p-2 px-4 w-full rounded-md focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-slate-100 dark:bg-slate-400/60 text-sm'
          >
            <option value=''>All Months</option>
            {uniqueMonths.map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='text-sm'>Sort By Date</label>
          <input
            type='date'
            value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className='p-2 px-4 w-full rounded-md focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-slate-100 dark:bg-slate-400/60 text-sm'
          />
        </div>

        <div>
          <label className='text-sm'>Sort By Employee</label>
          <select
            value={selectedEmployee || ''}
            onChange={(e) => setSelectedEmployee(e.target.value || null)}
            className='p-2 px-4 w-full rounded-md focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-slate-100 dark:bg-slate-400/60 text-sm'
          >
            <option value=''>All Employees</option>
            {uniqueEmployees.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
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
