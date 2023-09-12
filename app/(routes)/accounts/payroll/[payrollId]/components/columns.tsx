'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useRouter } from 'next/navigation';

interface PaySheetData {
  payslipId: string;
  employeeId: string;
  month: string;
  year: number;
  basicSalary: number;
  netSalary: number;
}

export const columns: ColumnDef<PaySheetData>[] = [
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
    accessorKey: 'payslipId',
    header: () => <div>PaySlip ID</div>,
    cell: ({ row }) => (
      <div className='capitalize text-center'>{row.getValue('payslipId')}</div>
    ),
  },
  {
    accessorKey: 'year',
    header: 'Year',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('year')}</div>,
  },
  {
    accessorKey: 'month',
    header: 'Month',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('month')}</div>
    ),
  },
  {
    accessorKey: 'basicSalary',
    header: () => <div className='text-left -ml-3'>Basic Salary</div>,
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('basicSalary')}</div>
    ),
  },
  {
    accessorKey: 'netSalary',
    header: () => <div className='text-left -ml-3'>Net Salary</div>,
    cell: ({ row }) => <div>{row.getValue('netSalary')}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const router = useRouter();
      const paysheet = row.original;

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
            {/* <DropdownMenuItem
              onClick={() => {
                router.push(`/accounts/payroll/${payroll.employeeId}`);
              }}
            >
              View PaySlip
            </DropdownMenuItem> */}
            <DropdownMenuItem asChild>
              <Dialog>
                <DialogTrigger className='text-sm text-center mx-auto w-full'>View PaySheet</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Pay sheet for {paysheet.month}, {paysheet.year}
                    </DialogTitle>
                    <DialogDescription>
                      add necessary details here
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                router.push(`/accounts/payroll/${paysheet.employeeId}/edit`);
              }}
            >
              Edit PaySlip
            </DropdownMenuItem>
            <DropdownMenuItem className='text-red-500' onClick={() => {}}>
              Delete PaySlip
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
