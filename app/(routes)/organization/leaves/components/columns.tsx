'use client';

import { ColumnDef } from '@tanstack/react-table';
import { AlertOctagon, BadgeCheck, Check, MoreHorizontal } from 'lucide-react';

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
import { Employee, Leave } from '@prisma/client';
import {
  RankingInfo,
  compareItems,
  rankItem,
} from '@tanstack/match-sorter-utils';
import { FilterFn, SortingFn, sortingFns } from '@tanstack/react-table';
import { format } from 'date-fns';

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

type LeaveWithEmployee = Leave & {
  employee: Employee
}

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

export const columns: ColumnDef<LeaveWithEmployee>[] = [
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
    header: () => <div>Request Date</div>,
    cell: ({ row }) => {
      const date = row.original.createdAt;

      return <div>{format(new Date(date), 'MM/dd/yyyy')}</div>;
    },
    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
  },

  {
    accessorKey: 'employee_name',
    header: () => <div>Employee</div>,
    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
    cell: ({ row }) => {
      const name = row.original.employee.name;

      return <div className='capitalize'>{name}</div>;
    },
  },
  {
    accessorKey: 'type',
    header: () => <div>Leave type</div>,
    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
    cell: ({ row }) => <div className='capitalize'>{row.getValue('type')}</div>,
  },
  {
    accessorKey: 'startDate',
    header: () => <div>Start Date</div>,
    cell: ({ row }) => {
      const startDate = row.original.startDate;

      return <div>{format(new Date(startDate || ''), 'MM/dd/yyyy')}</div>;
    },
  },
  {
    accessorKey: 'endDate',
    header: () => <div>End Date</div>,
    cell: ({ row }) => {
      const endDate = row.original.endDate;

      return <div>{format(new Date(endDate || ''), 'MM/dd/yyyy')}</div>;
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

      const handleDelete = async () => {};

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
