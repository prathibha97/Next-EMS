'use client';

import { SalaryAdvance } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';


export const SalaryAdvanceColumns: ColumnDef<SalaryAdvance>[] = [
  {
    accessorKey: 'date',
    header: () => <div>Start Date</div>,
    accessorFn: (row) => format(new Date(row?.date || ''), 'dd-MM-yyyy'),
  },
  {
    accessorKey: 'amount',
    header: () => <div>Requested Amount</div>,
    cell: ({ row }) => {
      return <div>{row.getValue('amount')}</div>;
    },
  },
  {
    accessorKey: 'isSettled',
    header: () => <div>Settled</div>,
    accessorFn: (row) => row.isSettled,
  },
];
