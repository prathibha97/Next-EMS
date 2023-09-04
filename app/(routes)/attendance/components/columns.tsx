'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Attendance } from '@prisma/client';
import { differenceInMilliseconds } from 'date-fns';
import { format } from 'date-fns-tz';

// Function to calculate the total time worked
function calculateTotalTime(
  timeIn: string | null | undefined,
  timeOut: string | null | undefined
): string {
  if (!timeIn || !timeOut) {
    return 'N/A';
  }

  const timeInDate = new Date(timeIn);
  const timeOutDate = new Date(timeOut);

  // Calculate the difference in milliseconds between timeOut and timeIn
  const timeDiffMilliseconds = differenceInMilliseconds(
    timeOutDate,
    timeInDate
  );

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(timeDiffMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor(
    (timeDiffMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((timeDiffMilliseconds % (1000 * 60)) / 1000);

  // Format the total time
  return format(new Date(0, 0, 0, hours, minutes, seconds), 'HH:mm:ss');
}

export const columns: ColumnDef<Attendance>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => (
      <div>
        {format(new Date(row.getValue('date')), 'yyyy-MM-dd', {
          timeZone: 'Asia/Colombo',
        })}
      </div>
    ),
  },
  {
    accessorKey: 'timeIn',
    header: () => <div>Time In</div>,
    cell: ({ row }) => (
      <div>
        {format(new Date(row.getValue('timeIn')), 'HH:mm:ss', {
          timeZone: 'Asia/Colombo',
        })}
      </div>
    ),
  },
  {
    accessorKey: 'timeOut',
    header: () => <div>Time Out</div>,
    cell: ({ row }) => {
      const timeOut = row.getValue('timeOut');
      return (
        <div>
          {timeOut
            ? // @ts-ignore
              format(new Date(timeOut), 'HH:mm:ss', {
                timeZone: 'Asia/Colombo',
              })
            : 'N/A'}
        </div>
      );
    },
  },
  {
    id: 'totalHours',
    header: () => <div>Total Time</div>,
    cell: ({ row }) => {
      const timeIn = row.getValue('timeIn');
      const timeOut = row.getValue('timeOut');
      // @ts-ignore
      const totalTime = calculateTotalTime(timeIn, timeOut);
      return <div>{totalTime}</div>;
    },
  },
];
