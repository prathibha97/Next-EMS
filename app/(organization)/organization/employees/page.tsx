'use client';
import { setEmployee } from '@/app/redux/features/employeeSlice';
import { useAppDispatch } from '@/app/redux/hooks';
import { useGetEmployeesQuery } from '@/app/redux/services/employeeApi';
import { Button } from '@/components/ui/button';
import { Employee } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import EmployeeCard from './components/employee-card';
import { SkeletonCard } from './components/loading-employee-card';

// const employees = [
//   {
//     id: 1,
//     avatarSrc: 'url-to-avatar1.png',
//     name: 'John Doe',
//     email: 'john@example.com',
//   },
//   {
//     id: 2,
//     avatarSrc: 'url-to-avatar2.png',
//     name: 'Jane Smith',
//     email: 'jane@example.com',
//   },
//   {
//     id: 3,
//     avatarSrc: 'url-to-avatar3.png',
//     name: 'Sam Doe',
//     email: 'sam@example.com',
//   },
//   {
//     id: 4,
//     avatarSrc: 'url-to-avatar4.png',
//     name: 'Mary Smith',
//     email: 'mary@example.com',
//   },
//   // Add more employees
// ];

const EmployeesPage = () => {
  const router = useRouter();
  const { status, data } = useSession();
  if (status === 'unauthenticated') {
    router.push('/');
  }else if (data?.user?.role !== 'ADMIN'){
    router.push('/denied');
  }
   const dispatch = useAppDispatch();

  const { data: employees, isLoading } = useGetEmployeesQuery();

  const handleClick = (id: string) => {
    router.push(`/organization/employees/${id}`);
  };

  return (
    <div>
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
