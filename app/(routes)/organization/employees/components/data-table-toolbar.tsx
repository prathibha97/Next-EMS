'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Project } from '@prisma/client';
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
  const [projects, setProjects] = useState<Project[]>([]);
  const isFiltered = table.getState().columnFilters.length > 0;

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/projects/my`
      );
      setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Filter employees...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {table.getColumn('project_name') && (
          <DataTableFacetedFilter
            column={table.getColumn('project_name')}
            title='Projects'
            options={projects.map((project) => ({
              label: project.name,
              value: project.name,
            }))}
          />
        )}
        {/* {table.getColumn('position') && (
          <DataTableFacetedFilter
            column={table.getColumn('position')}
            title='Status'
            options={statuses}
          />
        )}
        {table.getColumn('priority') && (
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
