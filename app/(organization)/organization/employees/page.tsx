'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import EmployeeCard from './components/employee-card';

const employees = [
  {
    id: 1,
    avatarSrc: 'url-to-avatar1.png',
    name: 'John Doe',
    email: 'john@example.com',
  },
  {
    id: 2,
    avatarSrc: 'url-to-avatar2.png',
    name: 'Jane Smith',
    email: 'jane@example.com',
  },
  {
    id: 3,
    avatarSrc: 'url-to-avatar3.png',
    name: 'Sam Doe',
    email: 'sam@example.com',
  },
  {
    id: 4,
    avatarSrc: 'url-to-avatar4.png',
    name: 'Mary Smith',
    email: 'mary@example.com',
  },
  // Add more employees
];

const EmployeesPage = () => {
  const router = useRouter();

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
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onClick={() => handleClick(employee.id.toString())}
          />
        ))}
      </div>
    </div>
  );
};

export default EmployeesPage;
