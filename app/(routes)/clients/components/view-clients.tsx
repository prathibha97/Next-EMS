'use client';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Client } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { columns } from './columns';

interface ViewClientsProps {
  clients: Client[];
}

const ViewClients: FC<ViewClientsProps> = ({ clients }) => {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.push('/clients/new')} className='mb-5'>
        Add Client
      </Button>
      <DataTable
        data={clients}
        columns={columns}
        inputType='text'
        placeholder='by client name'
        searchFilter='name'
      />
    </div>
  );
};

export default ViewClients;
