'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
  AlertOctagon,
  ArrowUpDown,
  BadgeCheck,
  Check,
  MoreHorizontal,
} from 'lucide-react';

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
import { cn } from '@/lib/utils';
import { Leave } from '@prisma/client';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import useLeaves from '@/hooks/useLeaves';

export const columns: ColumnDef<Leave>[] = [
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
    cell: ({ row }) => {
      const date = row.original.createdAt;

      return <div>{format(new Date(date), 'MM/dd/yyyy')}</div>;
    },
  },
  {
    accessorKey: 'employee_name',
    header: () => <div>Employee</div>,
    cell: ({ row }) => {
      const name = row.original.employee.name;

      return <div className='capitalize'>{name}</div>;
    },
  },
  {
    accessorKey: 'type',
    header: () => <div>Leave type</div>,
    cell: ({ row }) => <div className='capitalize'>{row.getValue('type')}</div>,
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
    accessorKey: 'reason',
    header: () => <div className='text-right'>Reason</div>,
    cell: ({ row }) => <div>{row.getValue('reason')}</div>,
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
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {

      const leave = row.original;

      const handleDelete = async () => {
        // removeEmployeeFromDepartment({
        //   employeeId: employee.id,
        //   departmentId: employee.departmentId as string,
        // });
        // refetch();
        // router.refresh();
      };

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
              Approve leave
              <Check className='ml-auto text-green-500' />
            </DropdownMenuItem>
            {leave.medical && (
              <DropdownMenuItem onClick={() => {}}>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[280px] justify-start text-left font-normal',
                    !leave?.medical && 'text-muted-foreground'
                  )}
                >
                  <div className='flex flexcol justify-center items-center mx-auto'>
                    <BadgeCheck className='mr-2 h-4 w-4' />
                    {leave?.medical ? (
                      <a
                        href={leave?.medical}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        View Medical
                      </a>
                    ) : (
                      <span>No Medical available</span>
                    )}
                  </div>
                </Button>
              </DropdownMenuItem>
            )}
            {leave.otherProof && (
              <DropdownMenuItem onClick={() => {}}>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[280px] justify-start text-left font-normal',
                    !leave?.otherProof && 'text-muted-foreground'
                  )}
                >
                  <div className='flex flexcol justify-center items-center mx-auto'>
                    <BadgeCheck className='mr-2 h-4 w-4' />
                    {leave?.otherProof ? (
                      <a
                        href={leave?.otherProof}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        View attachments
                      </a>
                    ) : (
                      <span>No attachments available</span>
                    )}
                  </div>
                </Button>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {}}>
              Reject leave
              <AlertOctagon className='ml-auto text-red-500' />
            </DropdownMenuItem>
            <DropdownMenuItem className='text-red-500' onClick={handleDelete}>
              Remove leave request
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
