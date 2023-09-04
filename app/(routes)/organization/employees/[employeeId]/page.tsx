'use client';
import { useGetEmployeeByIdQuery } from '@/app/redux/services/employeeApi';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import HRSettings from './components/hr-settings';
import LoadingState from './components/loading-state';
import PrivateInfo from './components/private-info';
import WorkInfo from './components/work-info';

interface EmployeeProps {
  params: {
    employeeId: string;
  };
}

const Employee: FC<EmployeeProps> = ({ params }) => {
  const router = useRouter();
  const { employeeId } = params;
  // const employee = useAppSelector((state) => state.employeeReducer.employee);
  const {
    data: employee,
    isLoading,
    isFetching,
  } = useGetEmployeeByIdQuery({ employeeId });

  if (isLoading || isFetching) {
    // Display loading skeleton while data is being fetched
    return <LoadingState />;
  }
  return (
    <div className='bg-slate-50 md:w-[850px] p-5 rounded-lg dark:bg-gray-800/40'>
      <div>
        <div className='flex justify-between'>
          <div className='flex flex-col'>
            <h1 className='text-3xl font-semibold'>
              {employee?.name || 'Employee Name'}
            </h1>
            <h2 className='mt-3 text-xl text-gray-600 dark:text-gray-300'>
              {employee?.position || 'Position'}
            </h2>
          </div>
          <div>
            <Image
              src={employee?.profile_photo || '/prathibha.jpg'}
              alt='Image'
              width={80}
              height={80}
              className='rounded-lg'
            />
          </div>
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <span>
            Work Mobile:{' '}
            <span className='text-sm text-gray-600 dark:text-gray-300'>
              {employee?.workMobile || 'Work Mobile not specified'}
            </span>
          </span>
          <span>
            Personal Mobile:{' '}
            <span className='text-sm text-gray-600 dark:text-gray-300'>
              {' '}
              {employee?.personalMobile || 'Personal Mobile not specified'}
            </span>
          </span>
          <span>
            Work Email:{' '}
            <span className='text-sm text-gray-600 dark:text-gray-300'>
              {employee?.workEmail || 'prathibha@sphiriadigital.com'}
            </span>
          </span>
        </div>
        <div className='flex flex-col'>
          <span>
            Department:{' '}
            <span className='text-sm text-gray-600 dark:text-gray-300'>
              {(employee &&
              // @ts-ignore
                employee.Department.map((department) => department.name).join(
                  ' ,'
                )) ||
                `Department not specified`}
            </span>
          </span>
          <span>
            Job Position:{' '}
            <span className='text-sm text-gray-600 dark:text-gray-300'>
              <span className='text-sm text-gray-600 dark:text-gray-300'>
                {employee?.jobPosition || `Job Position not specified`}
              </span>
            </span>
          </span>
          {/* <span>
            Manager:{' '}
            <span className='text-sm text-gray-600'>
              {employee?.manager || `Prathibha Ratnayake`}
            </span>
          </span> */}
        </div>
      </div>

      <Separator className='mt-3' />

      <div className='mt-8'>
        <Tabs defaultValue='work' className='w-full'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='work'>Work Information</TabsTrigger>
            <TabsTrigger value='private'>Private Information</TabsTrigger>
            <TabsTrigger value='HR'>HR Settings</TabsTrigger>
          </TabsList>
          <TabsContent value='work'>
            <WorkInfo employee={employee} />
          </TabsContent>
          <TabsContent value='private'>
            <PrivateInfo employee={employee} />
          </TabsContent>
          <TabsContent value='HR'>
            <HRSettings employee={employee} />
          </TabsContent>
        </Tabs>
      </div>

      <div className='mt-10'>
        <Button
          onClick={() =>
            router.push(`/organization/employees/${params.employeeId}/edit`)
          }
        >
          <Pencil className='w-4 h-4 mr-2' /> Edit
        </Button>
      </div>
    </div>
  );
};

export default Employee;
