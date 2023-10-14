'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

import { labels, statuses } from '@/app/(routes)/projects/data/data';
import { DataTableColumnHeader } from '@/app/(routes)/projects/tasks/components/data-table-column-header';
import { DataTableRowActions } from '@/app/(routes)/projects/tasks/components/data-table-row-actions';
import { Client, Project } from '@prisma/client';
import { format } from 'date-fns';
import { Progress } from '@/components/ui/progress';

type ProjectWithClient = Project & {
  client: Client;
};

export const columns: ColumnDef<ProjectWithClient>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.category
      );

      return (
        <div className='flex space-x-2'>
          {label && (
            <Badge variant='outline' className='dark:bg-purple-500/60'>
              {label.label}
            </Badge>
          )}
          <span className='max-w-[500px] truncate font-medium'>
            {row.getValue('name')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      );

      if (!status) {
        return null;
      }

      return (
        <div className='flex w-[100px] items-center'>
          {status.icon && (
            <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'progress',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Progress' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <Progress value={row.getValue('progress')} />
        </div>
      );
    },
  },
  {
    accessorKey: 'endDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Deadline' />
    ),
    // cell: ({ row }) => <div className='w-[80px]'>{row.getValue('client.name')}</div>,
    accessorFn: (row) => format(row.endDate as Date, 'dd-MM-yyyy'),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
