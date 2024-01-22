'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Department, Employee } from '@prisma/client';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

type EmployeeWithDepartment = Employee & {
  employeeDepartment: Department;
};

export const columns: ColumnDef<EmployeeWithDepartment>[] = [
  {
    accessorKey: 'employeeNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Employee ID' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px]'>{row.getValue('employeeNumber')}</div>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'workEmail',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => <div className='w-[180px]'>{row.getValue('workEmail')}</div>,
  },
  {
    accessorKey: 'employeeDepartment_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Department' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px]'>{row.original.employeeDepartment.name}</div>
    ),
  },
  {
    accessorKey: 'position',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Designation' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px]'>{row.getValue('position')}</div>
    ),
  },

  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
