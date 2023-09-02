'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Attendance } from '@prisma/client';
import { format } from 'date-fns-tz';
import { useRouter } from 'next/navigation';
import { differenceInMilliseconds } from 'date-fns';

// Function to calculate the total time worked
function calculateTotalTime(timeIn: string | null | undefined , timeOut: string | null | undefined): string {
  if (!timeIn || !timeOut) {
    return 'N/A';
  }

  const timeInDate = new Date(timeIn);
  const timeOutDate = new Date(timeOut);

  // Calculate the difference in milliseconds between timeOut and timeIn
  const timeDiffMilliseconds = differenceInMilliseconds(timeOutDate, timeInDate);

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(timeDiffMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiffMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
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
      const totalTime = calculateTotalTime(timeIn, timeOut);
      return <div>{totalTime}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const router = useRouter();

      const attendance = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => {}}>
              Copy employee ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {}}>
              View employee
            </DropdownMenuItem>
            <DropdownMenuItem className='text-red-500'>
              Remove from department
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
