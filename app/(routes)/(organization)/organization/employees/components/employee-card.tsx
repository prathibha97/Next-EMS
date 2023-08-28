'use client'
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Employee } from '@prisma/client';
import { AvatarImage } from '@radix-ui/react-avatar';
import { FC } from 'react';

interface EmployeeCardProps {
  employee: Employee
  onClick: () => void;
}

const EmployeeCard: FC<EmployeeCardProps> = ({ employee, onClick }) => {
  return (
    <div>
    <Card
      className='flex items-center justify-center bg-white rounded-md shadow-md min-w-[100px] hover:cursor-pointer'
      onClick={() => onClick()}
    >
      <CardContent className='flex items-center mt-2 space-x-4'>
        <Avatar className='mr-2 h-10 w-10'>
          <AvatarImage
            src={employee.profile_photo || `https://avatar.vercel.sh/personal.png`}
            alt='personal'
          />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <h1 className='text-lg font-semibold'>{employee.name}</h1>
          <h3 className='text-xs text-gray-500'>{employee.workEmail}</h3>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};

export default EmployeeCard;
