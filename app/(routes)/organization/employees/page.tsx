'use client';
import { setEmployee } from '@/app/redux/features/employeeSlice';
import { useAppDispatch } from '@/app/redux/hooks';
import { useGetEmployeesQuery } from '@/app/redux/services/employeeApi';
import { Button } from '@/components/ui/button';
import { Employee } from '@prisma/client';
import { useRouter } from 'next/navigation';
import EmployeeCard from './components/employee-card';
import { SkeletonCard } from './components/loading-employee-card';
import { useEffect, useState } from 'react';

const EmployeesPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data: employeeData, isLoading, refetch:refetchEmployees} = useGetEmployeesQuery();

  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    if (employeeData) {
      setEmployees(employeeData);
    }
  }, [employeeData]);

  useEffect(() => {
    refetchEmployees()
  }, [])

  const handleClick = (id: string) => {
    router.push(`/organization/employees/${id}`);
  };

  return (
    <div className='container'>
      <div className='flex justify-end mb-5'>
        <Button onClick={() => router.push(`employees/new`)}>
          Add Employee
        </Button>
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
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
      </div>
    </div>
  );
};

export default EmployeesPage;
