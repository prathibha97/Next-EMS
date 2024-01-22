'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { DataTable } from './data-table';

interface ViewEmployeesProps {
  employees: any;
}

export default async function ViewEmployees({ employees }: ViewEmployeesProps) {
  const router = useRouter();

  return (
    <div className='container'>
      <div className='flex justify-end mb-5'>
        <Button onClick={() => router.push(`employees/new`)}>
          Add Employee
        </Button>
      </div>

      <div className='bg-white dark:bg-gray-900/60 p-5 rounded-lg shadow'>
        <DataTable data={employees} columns={columns} />
      </div>
    </div>
  );
}
