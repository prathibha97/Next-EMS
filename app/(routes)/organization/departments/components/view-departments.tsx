'use client';
import { selectDepartment } from '@/app/redux/features/departmentSlice';
import { useAppDispatch } from '@/app/redux/hooks';
import { Button } from '@/components/ui/button';
import { Department } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import DepartmentCard from './department-card';

interface ViewDepartmentsProps {
  departments: Department[];
}

const ViewDepartments: FC<ViewDepartmentsProps> = ({ departments }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

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
        {departments?.map((department) => (
          <DepartmentCard
            key={department.id}
            // @ts-ignore
            department={department}
            onClick={() => {
              handleClick(department.id.toString());
              dispatch(selectDepartment(department));
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewDepartments;
