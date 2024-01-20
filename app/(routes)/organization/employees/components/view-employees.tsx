'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { DataTable } from './data-table';
import { columns } from './columns';

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
      {/* <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {isLoading
          ? // Display the skeleton component while loading
            Array.from({ length: 12 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : // Render the actual employee cards
            employees?.map((employee: Employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onClick={() => {
                  handleClick(employee.id.toString());
                  dispatch(setEmployee(employee));
                }}
              />
            ))}
      </div> */}
      <div className='bg-white dark:bg-gray-900/60 p-5 rounded-lg shadow'>
        <DataTable data={employees} columns={columns} />
      </div>
    </div>
  );
}
