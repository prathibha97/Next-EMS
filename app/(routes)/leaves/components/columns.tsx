'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { EmployeeHoverCard } from '@/components/cards/employee-hover-card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Employee } from '@prisma/client';

interface Leaves{
  id: number
  requestDate: string
  leaveType: string
  startDate: string
  endDate: string
  leaveDays: number
  leaveStatus: string
}

export const columns: ColumnDef<Leaves>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'requestDate',
    header: 'Request Date',
    cell: ({ row }) => {
      <div className='text-center'>{row.getValue('requestDate')}</div>;
    },
  },
  {
    accessorKey: 'leaveType',
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
      <div className='text-center capitalize'>{row.getValue('leaveType')}</div>
    ),
  },
  {
    accessorKey: 'startDate',
    header: () => <div>Start Date</div>,
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('startDate')}</div>
    ),
  },
  {
    accessorKey: 'endDate',
    header: () => <div>End Date</div>,
    cell: ({ row }) => <div>{row.getValue('endDate')}</div>,
  },
  {
    accessorKey: 'leaveDays',
    header: () => <div>Leave Days</div>,
    cell: ({ row }) => (
      <div className='text-center'>{row.getValue('leaveDays')}</div>
    ),
  },
  {
    accessorKey: 'leaveStatus',
    header: () => <div>End Date</div>,
    cell: ({ row }) => <div>{row.getValue('leaveStatus')}</div>,
  },
];
