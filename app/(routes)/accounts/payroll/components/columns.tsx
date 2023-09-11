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
import { useRouter } from 'next/navigation';

interface PayrollData {
  employeeId: string;
  employeeName: string;
  designation: string;
  basicSalary: number;
  netSalary: number;
}

export const columns: ColumnDef<PayrollData>[] = [
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
    accessorKey: 'employeeId',
    header: () => <div>Employee Number</div>,
    cell: ({ row }) => (
      <div className='capitalize text-center'>{row.getValue('employeeId')}</div>
    ),
  },
  {
    accessorKey: 'employeeName',
    header: 'Employee',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('employeeName')}</div>
    ),
  },
  {
    accessorKey: 'designation',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Designation
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('designation')}</div>
    ),
  },
  {
    accessorKey: 'basicSalary',
    header: () => <div className='text-right'>Basic Salary</div>,
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('basicSalary')}</div>
    ),
  },
  {
    accessorKey: 'netSalary',
    header: () => <div className='text-right'>Net Salary</div>,
    cell: ({ row }) => <div>{row.getValue('netSalary')}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const router = useRouter();
      const payroll = row.original;

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
            <DropdownMenuItem onClick={() => {
              router.push(`/accounts/payroll/${payroll.employeeId}`);
            }}>View Payroll</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {
              router.push(`/accounts/payroll/${payroll.employeeId}/edit`);
            }}>Edit Payroll</DropdownMenuItem>
            <DropdownMenuItem className='text-red-500' onClick={() => {}}>
              Delete Payroll
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
