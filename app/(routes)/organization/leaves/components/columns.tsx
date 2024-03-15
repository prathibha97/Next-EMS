'use client';

import { ColumnDef } from '@tanstack/react-table';
import { BadgeCheck, MoreHorizontal } from 'lucide-react';

import {
  useRemoveLeaveRequestMutation,
  useUpdateLeaveRequestMutation,
} from '@/app/redux/services/leaveApi';
import DeleteConfirmationDialog from '@/components/delete-confirmation-dialog';
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
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Employee, Leave } from '@prisma/client';
import {
  RankingInfo,
  compareItems,
  rankItem,
} from '@tanstack/match-sorter-utils';
import { FilterFn, SortingFn, sortingFns } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

type LeaveWithEmployee = Leave & {
  employee: Employee;
};

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
    accessorFn: (row) => format(new Date(row?.createdAt || ''), 'dd-MM-yyyy'),

    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
  },

  {
    accessorKey: 'employee_name',
    header: () => <div>Employee</div>,
    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
    accessorFn: (row) => row.employee.name,
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
    accessorFn: (row) => format(new Date(row?.startDate || ''), 'dd-MM-yyyy'),
  },
  {
    accessorKey: 'endDate',
    header: () => <div>End Date</div>,
    accessorFn: (row) => format(new Date(row?.endDate || ''), 'dd-MM-yyyy'),
  },
  {
    accessorKey: 'reason',
    header: () => <div>Reason</div>,
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
      const router = useRouter();
      const leave = row.original;

      const [removeLeaveRequest] = useRemoveLeaveRequestMutation();
      const [updateLeaveRequest] = useUpdateLeaveRequestMutation();

      const handleApprove = async () => {
        try {
          await updateLeaveRequest({
            leaveId: row.original.id,
            body: {
              status: 'Approved',
            },
          });
          router.refresh();
          toast({
            title: 'Success',
            description: `${row.original.employee.name}'s leave approved successfully`,
          });
        } catch (error) {
          toast({
            title: 'Failed',
            description: `Failed to approve ${row.original.employee.name}'s leave request. Please try again`,
            variant: 'destructive',
          });
          console.log(error);
        }
      };

      const handleReject = async () => {
        try {
          await updateLeaveRequest({
            leaveId: row.original.id,
            body: {
              status: 'Rejected',
              remarks: '',
            },
          });
          router.refresh();
          toast({
            title: 'Success',
            description: `${row.original.employee.name}'s leave rejected successfully`,
          });
        } catch (error) {
          toast({
            title: 'Failed',
            description: `Failed to reject ${row.original.employee.name}'s leave request. Please try again`,
            variant: 'destructive',
          });
          console.log(error);
        }
      };

      const handleDelete = async () => {
        await removeLeaveRequest({ leaveId: row.original.id });
        router.refresh();
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
            <DropdownMenuItem
              className='text-green-500'
              onClick={handleApprove}
            >
              Approve leave
            </DropdownMenuItem>
            {leave.medical && (
              <DropdownMenuItem onClick={() => {}}>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-fit justify-start text-left font-normal',
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
            <DropdownMenuItem asChild>
              <DeleteConfirmationDialog
                label='Reject leave'
                onClick={handleReject}
              />
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
