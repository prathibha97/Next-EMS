'use client';
import { setEmployee } from '@/app/redux/features/employeeSlice';
import { useAppDispatch } from '@/app/redux/hooks';
import { useGetEmployeesQuery } from '@/app/redux/services/employeeApi';
import { Button } from '@/components/ui/button';
import { Employee } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import EmployeeCard from './components/employee-card';
import { SkeletonCard } from './components/loading-employee-card';

const EmployeesPage = () => {
  const { status, data } = useSession();
  console.log(data);
  const router = useRouter();
  // const [isMounted, setIsMounted] = useState(false)

  // useEffect(()=>{
  //   if(!isMounted){
  //     setIsMounted(true)
  //   }
  // },[])

  // if (!isMounted) {
  //   return null;
  // }

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } 
  }, [router, status]);

  //  if (data?.user?.role !== 'ADMIN') {
  //    router.push('/denied');
  //  }

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
