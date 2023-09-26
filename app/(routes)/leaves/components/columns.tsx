'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Leave } from '@prisma/client';
import { differenceInDays, format, parseISO } from 'date-fns';

export const columns: ColumnDef<Leave>[] = [
  {
    accessorKey: 'createdAt',
    header: () => <div>Request Date</div>,
    cell: ({ row }) => {
      const date = row.original.createdAt;

      return <div>{format(new Date(date), 'MM/dd/yyyy')}</div>;
    },
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
    cell: ({ row }) => {
      const startDate = row.original.startDate;

      return <div>{format(new Date(startDate), 'MM/dd/yyyy')}</div>;
    },
  },
  {
    accessorKey: 'endDate',
    header: () => <div>End Date</div>,
    cell: ({ row }) => {
      const endDate = row.original.endDate;

      return <div>{format(new Date(endDate), 'MM/dd/yyyy')}</div>;
    },
  },
  {
    accessorKey: 'leaveDays',
    header: () => <div>Leave Days</div>,
    cell: ({ row }) => {
      const leave = row.original;
      const startDate = parseISO(leave.startDate);
      const endDate = parseISO(leave.endDate);

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
