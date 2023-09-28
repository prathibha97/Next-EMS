'use client';

import { ColumnDef } from '@tanstack/react-table';

interface SalaryAdvanceColumnsProps {
  date: string;
  amount: number;
}

export const SalaryAdvanceColumns: ColumnDef<SalaryAdvanceColumnsProps>[] = [
  {
    accessorKey: 'date',
    header: () => <div>Request Date</div>,
    cell: ({ row }) => {
      return <div>{row.getValue('date')}</div>;
    },
  },
  {
    accessorKey: 'amount',
    header: () => <div>Requested Amount</div>,
    cell: ({ row }) => {
      return <div>{row.getValue('amount')}</div>;
    },
  },

];
