'use client';
import { selectDepartment } from '@/app/redux/features/departmentSlice';
import { useAppDispatch } from '@/app/redux/hooks';
import { useGetDepartmentsQuery } from '@/app/redux/services/departmentApi';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import DepartmentCard from './components/department-card';
import { SkeletonCard } from './components/loading-employee-card';

const DepartmentsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/');
    },
  });
  useEffect(() => {
    if (session && session?.user?.role !== 'ADMIN') {
      router.push('/denied');
    }
  }, [session]);

  const { data: departments, isLoading, refetch:refetchDepartments } = useGetDepartmentsQuery();

  const handleClick = (id: string) => {
    router.push(`/organization/departments/${id}`);
  };

  return (
    <div className='min-w-max lg:w-[850px]'>
      <div className='flex justify-end mb-5'>
        <Button onClick={() => router.push(`departments/new`)}>
          Add Department
        </Button>
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {isLoading
          ? // Display the skeleton component while loading
            Array.from({ length: 12 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : // Render the actual employee cards
            departments?.map((department) => (
              <DepartmentCard
                key={department.id}
                // @ts-ignore
                department={department}
                onClick={() => {
                  handleClick(department.id.toString());
                  dispatch(selectDepartment(department));
                }}
                refetchDepartments={refetchDepartments}
              />
            ))}
      </div>
    </div>
  );
};

export default DepartmentsPage;
