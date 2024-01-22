import { DataTable } from '@/components/data-table';
import prisma from '@/lib/prisma';
import { FC } from 'react';
import { columns } from './components/columns';

export const revalidate = 0;

interface DepartmentPageProps {
  params: {
    departmentId: string;
  };
}

const DepartmentPage: FC<DepartmentPageProps> = async ({ params }) => {
  const department = await prisma.department.findUnique({
    where: {
      id: params.departmentId,
    },
    include: {
      employees: true,
      manager: true,
    },
  });

  const data = department?.employees;
  return (
    <div className='border lg:w-full mt-5 p-5 rounded-lg'>
      <div className=' bg-slate-100 dark:bg-gray-900/60 p-5 rounded-lg'>
        <div className='flex gap-3 flex-col md:flex-row justify-between'>
          <div>
            <span className='font-semibold'>Department Name: </span>
            <span className='font-light'>{department?.name}</span>
          </div>
          <div>
            <span className='font-semibold'>Department Manager: </span>
            <span className='font-light'>{department?.manager?.name}</span>
          </div>
        </div>
        <div className='mt-3'>
          <span className='font-semibold'>Department Description: </span>
          <span className='font-light'>{department?.description}</span>
        </div>
      </div>
      <div className='mx-auto py-6'>
        <DataTable
          columns={columns}
          data={data!}
          inputType='text'
          searchFilter='name'
          placeholder='Name'
        />
      </div>
    </div>
  );
};

export default DepartmentPage;
