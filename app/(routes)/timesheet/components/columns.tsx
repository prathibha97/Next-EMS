'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TimesheetData {
  employee_name: string;
  client: string;
  project: string;
  task: string;
  work_performed: string;
  time_spent: number;
}

export const columns: ColumnDef<TimesheetData>[] = [
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
    accessorKey: 'date',
    header: () => <div className='text-right'>Date</div>,
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('date')}</div>
    ),
  },
  {
    accessorKey: 'employee_name',
    header: 'Employee',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('employee_name')}</div>
    ),
  },
  {
    accessorKey: 'client',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Client
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('client')}</div>
    ),
  },
  {
    accessorKey: 'project',
    header: () => <div className='text-right'>Project</div>,
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('project')}</div>
    ),
  },
  {
    accessorKey: 'task',
    header: () => <div className='text-right'>Task</div>,
    cell: ({ row }) => <div>{row.getValue('task')}</div>,
  },
  {
    accessorKey: 'work_performed',
    header: () => <div className='text-right'>Work Performed</div>,
    cell: ({ row }) => <div>{row.getValue('work_performed')}</div>,
  },
  {
    accessorKey: 'time_spent',
    header: () => <div className='text-right'>Time Spent</div>,
    cell: ({ row }) => <div>{row.getValue('time_spent')}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const timeLog = row.original;

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
              View Time Log
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {}}>
              Edit Time Log
            </DropdownMenuItem>
            <DropdownMenuItem className='text-red-500' onClick={() => {}}>
              Delete Time Log
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
