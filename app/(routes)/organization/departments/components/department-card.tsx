'use client';
import { useRemoveDepartmentMutation } from '@/app/redux/services/departmentApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Department, Employee } from '@prisma/client';
import { MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface DepartmentCardProps {
  department: Department & {
    employees: Employee[] | null;
    manager: Employee | null;
  };
  onClick: () => void;
}

const DepartmentCard: FC<DepartmentCardProps> = ({ department, onClick }) => {
  const router = useRouter();
  const [removeDepartment] = useRemoveDepartmentMutation();
  return (
    <div>
      <Card className='flex bg-white items-center justify-between w-full rounded-md shadow-md min-w-[100px] '>
        <CardContent className='flex mt-2 space-x-4'>
          <div className='flex flex-col'>
            <div className='flex justify-between w-[280px] min-h-[60px] md:w-[250px] lg:w-[420px] 2xl:w-[515px]'>
              <h1
                className='text-lg font-semibold hover:cursor-pointer'
                onClick={() => onClick()}
              >
                {department.name}
              </h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='h-8 w-8 p-0'>
                    <span className='sr-only'>Open menu</span>
                    <MoreVertical className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      router.push(`/organization/departments/${department.id}`);
                    }}
                  >
                    View department
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      router.push(`/organization/departments/${department.id}/edit`);
                    }}
                  >
                    Edit department
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className='text-red-500'
                    onClick={() => {
                      removeDepartment({ departmentId: department.id });
                      router.refresh();
                    }}
                  >
                    Remove department
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
