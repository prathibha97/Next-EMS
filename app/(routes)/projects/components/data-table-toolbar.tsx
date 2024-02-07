'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Client } from '@prisma/client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { statuses } from '../data/data';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const [clients, setClients] = useState<Client[]>([]);
  const isFiltered = table.getState().columnFilters.length > 0;

  useEffect(() => {
    const fetchClients = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/clients`
      );
      setClients(data);
    };
    fetchClients();
  }, []);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col md:flex-row gap-2 md:space-x-2">
        <div className="w-full">
          <Input
            placeholder="Filter projects..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className="h-8 w-full lg:w-[250px]"
          />
        </div>
        <div className="flex flex-row gap-2 justify-between">
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
            {table.getColumn('client_name') && (
              <DataTableFacetedFilter
                column={table.getColumn('client_name')}
                title="Clients"
                options={clients.map((client) => ({
                  label: client.name,
                  value: client.name,
                }))}
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
