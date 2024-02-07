'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Project } from '@prisma/client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { priorities, statuses } from '../data/data';
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
        `${process.env.NEXT_PUBLIC_URL}/projects`
      );
      setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col md:flex-row w-full md:space-x-2 gap-2">
        <div>
          <Input
            placeholder="Filter tasks..."
            value={
              (table.getColumn('taskId')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('taskId')?.setFilterValue(event.target.value)
            }
            className="h-8 w-full lg:w-[250px]"
          />
        </div>
        <div className="flex gap-2">
          <div>
            {table.getColumn('project_name') && (
              <DataTableFacetedFilter
                column={table.getColumn('project_name')}
                title="Projects"
                options={projects.map((project) => ({
                  label: project.name,
                  value: project.name,
                }))}
              />
            )}
          </div>
          <div>
            {table.getColumn('status') && (
              <DataTableFacetedFilter
                column={table.getColumn('status')}
                title="Status"
                options={statuses}
              />
            )}
          </div>
          <div>
            {table.getColumn('priority') && (
              <DataTableFacetedFilter
                column={table.getColumn('priority')}
                title="Priority"
                options={priorities}
              />
            )}
          </div>
          <div>
            {isFiltered && (
              <Button
                variant="ghost"
                onClick={() => table.resetColumnFilters()}
                className="h-8 px-2 lg:px-3"
              >
                Reset
                <Cross2Icon className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
