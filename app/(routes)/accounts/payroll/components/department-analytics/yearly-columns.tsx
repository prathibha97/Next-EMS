'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { Employee } from '@prisma/client';

interface YearlyColumns {
  month: string;
  epf: number;
  etf: number;
  total: number;
}

export const yearlyColumns: ColumnDef<YearlyColumns>[] = [
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
    accessorKey: 'year',
    header: 'Year',
    cell: ({ row }) => (
      <div>{row.getValue('year')}</div>
    ),
  },
  {
    accessorKey: 'epf',
    header: 'EPF',
    cell: ({ row }) => <div>{row.getValue('epf')}</div>,
  },
  {
    accessorKey: 'etf',
    header: 'ETF',
    cell: ({ row }) => <div>{row.getValue('etf')}</div>,
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => <div>{row.getValue('total')}</div>,
  },
];
