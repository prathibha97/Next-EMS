'use client';

import { Loan } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

export const LoanColumns: ColumnDef<Loan>[] = [
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
    accessorKey: 'installments',
    header: () => <div>Installments</div>,
    cell: ({ row }) => {
      return <div>{row.getValue('installments')}</div>;
    },
  },
  {
    accessorKey: 'paidInstallments',
    header: () => <div>Paid Installments</div>,
    cell: ({ row }) => {
      return <div>{row.getValue('paidInstallments')}</div>;
    },
  },
  {
    accessorKey: 'settledAmount',
    header: () => <div>Settled Amount</div>,
    cell: ({ row }) => {
      return <div>{row.getValue('settledAmount')}</div>;
    },
  },
  {
    accessorKey: 'isSettled',
    header: () => <div>Settled</div>,
    accessorFn: (row) => row.isSettled,
  },
];
