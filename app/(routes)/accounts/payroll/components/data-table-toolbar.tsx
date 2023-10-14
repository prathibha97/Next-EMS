'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Department, Employee } from '@prisma/client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const isFiltered = table.getState().columnFilters.length > 0;

  useEffect(() => {
    const fetchEmployees = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/employees`
      );
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/departments`
      );
      setDepartments(data);
    };
    fetchDepartments();
  }, []);

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Filter employee...'
          value={
            (table.getColumn('employeeNumber')?.getFilterValue() as string) ??
            ''
          }
          onChange={(event) =>
            table
              .getColumn('employeeNumber')
              ?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {table.getColumn('name') && (
          <DataTableFacetedFilter
            column={table.getColumn('name')}
            title='Employees'
            options={employees.map((employee) => ({
              label: employee.name,
              value: employee.name,
            }))}
          />
        )}
        {table.getColumn('employeeDepartment_name') && (
          <DataTableFacetedFilter
            column={table.getColumn('employeeDepartment_name')}
            title='Departments'
            options={departments.map((department) => ({
              label: department.name,
              value: department.name,
            }))}
          />
        )}
        {/* {table.getColumn('priority') && (
          <DataTableFacetedFilter
            column={table.getColumn('priority')}
            title='Priority'
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
