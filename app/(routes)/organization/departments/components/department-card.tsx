'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Department, Employee } from '@prisma/client';
import { FC } from 'react';

interface DepartmentCardProps {
  department: Department & {
    employees: Employee[] | null;
    manager: Employee | null;
  };
  onClick: () => void;
}

const DepartmentCard: FC<DepartmentCardProps> = ({ department, onClick }) => {
  return (
    <div>
      <Card
        className='flex bg-white rounded-md shadow-md min-w-[100px] hover:cursor-pointer'
        onClick={() => onClick()}
      >
        <CardContent className='flex mt-2 space-x-4'>
          <div className='flex flex-col'>
            <h1 className='text-lg font-semibold'>{department.name}</h1>
            <h3 className='text-xs text-gray-500'>{department.description}</h3>
            <div className='flex flex-col mt-1'>
              <span className='text-sm font-semibold'>
                Manager:
                <span className='text-sm text-gray-500'>
                  {' '}
                  {department.manager?.name}
                </span>
              </span>
              <span className='text-sm font-semibold'>
                No of employees:
                <span className='text-sm text-gray-500'>
                  {' '}
                  {department.employees?.length}
                </span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentCard;
