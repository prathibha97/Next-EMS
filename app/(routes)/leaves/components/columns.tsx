'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Leave } from '@prisma/client';
import { differenceInDays, format } from 'date-fns';

export const columns: ColumnDef<Leave>[] = [
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Request Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    accessorFn: (row) => format(new Date(row?.createdAt || ''), 'dd-MM-yyyy'),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Leave Type
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='text-center capitalize'>{row.getValue('type')}</div>
    ),
  },
  {
    accessorKey: 'startDate',
    header: () => <div>Start Date</div>,
    accessorFn: (row) => format(new Date(row?.startDate || ''), 'dd-MM-yyyy'),
  },
  {
    accessorKey: 'endDate',
    header: () => <div>End Date</div>,
    accessorFn: (row) => format(new Date(row?.endDate || ''), 'dd-MM-yyyy'),
  },
  {
    accessorKey: 'leaveDays',
    header: () => <div>Leave Days</div>,
    cell: ({ row }) => {
      const leave = row.original;
      const startDate = new Date(leave.startDate || '');
      const endDate = new Date(leave.endDate || '');

      let leaveDays = differenceInDays(endDate, startDate);

      // If leave duration is less than a day, consider it as one day
      if (leaveDays <= 0) {
        leaveDays = 1;
      }

      return <div className='text-center'>{leaveDays}</div>;
    },
  },

  {
    accessorKey: 'status',
    header: () => <div className='font-bold'>Status</div>,
    cell: ({ row }) => {
      const leaveStatus = row.getValue('status');
      let textColor = '';

      if (leaveStatus === 'Approved') {
        textColor = 'text-green-500';
      } else if (leaveStatus === 'Pending') {
        textColor = 'text-yellow-500';
      } else if (leaveStatus === 'Rejected') {
        textColor = 'text-red-500';
      }

      return <div className={textColor}>{row.getValue('status')}</div>;
    },
  },
];
