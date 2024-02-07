import { DataTable } from '@/components/data-table';
import prisma from '@/lib/prisma';
import { FC } from 'react';
import { columns } from './users/components/columns';
import { Separator } from '@/components/ui/separator';

export const revalidate = 0;

const UsersPage = async ({}) => {
  const data = await prisma.user.findMany();

  return (
    <div className="md:w-full xl:w-full rounded-lg">
      <div className=" mb-5">
        <DataTable
          columns={columns}
          data={data}
          placeholder="Email"
          searchFilter="email"
        />
      </div>
    </div>
  );
};

export default UsersPage;
