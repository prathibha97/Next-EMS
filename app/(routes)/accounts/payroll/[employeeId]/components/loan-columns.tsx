'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Leave } from '@prisma/client';
import { differenceInDays, format, parseISO } from 'date-fns';


interface LoancolumnsProps{
    date: string
    number: number
}

export const Loancolumns: ColumnDef<LoancolumnsProps>[] = [
  {
    accessorKey: 'date',
    header: () => <div>Request Date</div>,
    cell: ({ row }) => {
      

      return <div>{row.getValue("date")}</div>;
    },
  },

  {
    accessorKey: 'amount',
    header: () => <div>Requested Amount</div>,
    cell: ({ row }) => {
      

      return <div>{row.getValue("amount")}</div>;
    },
  },


  

  
];
