'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { Employee } from '@prisma/client';

interface EPFEPTFColumns {
  month: string;
  epf: number;
  etf: number;
  total: number;
}

export const EPFEPTFColumns: ColumnDef<EPFEPTFColumns>[] = [
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
    accessorKey: 'month',
    header: 'Month',
    cell: ({ row }) => (
      <div className='capitalize text-center'>{row.getValue('month')}</div>
    ),
  },
  {
    accessorKey: 'epf',
    header: 'EPF',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('epf')}</div>,
  },
  {
    accessorKey: 'etf',
    header: 'ETF',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('etf')}</div>,
  },
  {
    accessorKey: 'total',
    header: 'Tota',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('etf')}</div>,
  },
];
