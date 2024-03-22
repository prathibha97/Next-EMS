import useEmployee from '@/hooks/useEmployee';
import { format } from 'date-fns';
import Image from 'next/image';
import { FC } from 'react';

interface EmployeeProps {
  params: {
    employeeId: string;
  };
}

const Employee: FC<EmployeeProps> = async ({ params }) => {
  const { getLoggedInEmployee } = useEmployee();
  const employee = await getLoggedInEmployee();

  if (!employee) {
    return (
      <div className='w-full h-full m-auto flex items-center justify-center text-gray-500'>
        You Don&apos;t have a profile associated with yet
      </div>
    );
  }

  return (
    <div className='bg-white md:w-full xl:w-full p-5 rounded-lg dark:bg-gray-800/40'>
      <div className='border p-5 rounded-md'>
        <div className='flex flex-col md:flex-row items-center md:items-start'>
          <div className='mb-4 md:mr-8'>
            <Image
              src={employee?.profile_photo || '/avatar.jpeg'}
              alt='Image'
              width={90}
              height={90}
              className='rounded-lg'
            />
          </div>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-semibold'>
              {employee?.name || 'Employee Name'}
            </h1>
            <h2 className='mt-3 text-lg text-gray-600 dark:text-gray-300'>
              {employee?.position || 'Position'}
            </h2>
          </div>
        </div>
      </div>

      <div className='flex flex-col mt-5 border p-5 rounded-md'>
        <h1 className='text-2xl font-semibold'>Personal Information</h1>
        <div className='flex flex-wrap mt-5'>
          <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3'>
            <span>
              Name:{' '}
              <span className='text-gray-600 dark:text-gray-300'>
                {employee?.name || 'Not specified'}
              </span>
            </span>
          </div>
          <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3'>
            <span>
              Email:{' '}
              <span className='text-gray-600 dark:text-gray-300'>
                {' '}
                {employee?.personalEmail || 'Not specified'}
              </span>
            </span>
          </div>
          <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3'>
            <span>
              Mobile:{' '}
              <span className='text-gray-600 dark:text-gray-300'>
                {employee?.personalMobile || 'Not specified'}
              </span>
            </span>
          </div>
          <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3'>
            <span>
              Gender:{' '}
              <span className='text-gray-600 dark:text-gray-300'>
                {employee?.gender || 'Not specified'}
              </span>
            </span>
          </div>
          <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3'>
            <span>
              DOB:{' '}
              <span className='text-gray-600 dark:text-gray-300'>
                {format(new Date(employee?.dateOfBirth!), 'MM-dd-yyyy')}
              </span>
            </span>
          </div>
          <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3'>
            <span>
              Marital Status:{' '}
              <span className='text-gray-600 dark:text-gray-300'>
                {employee?.maritalStatus || 'Not specified'}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* <Separator className="mt-3" /> */}

      <div className='flex flex-col mt-5 border p-5 rounded-md'>
        <h1 className='text-2xl font-semibold'>Employment Details</h1>
        <div className='flex flex-wrap mt-5'>
          <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3'>
            <span>
              Job Title:{' '}
              <span className='text-gray-600 dark:text-gray-300'>
                {employee?.position || 'Not specified'}
              </span>
            </span>
          </div>
          <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3'>
            <span>
              Work Email:{' '}
              <span className='text-gray-600 dark:text-gray-300'>
                {' '}
                {employee?.workEmail || 'Not specified'}
              </span>
            </span>
          </div>
          <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3'>
            <span>
              Work Mobile:{' '}
              <span className='text-gray-600 dark:text-gray-300'>
                {employee?.workMobile || 'Not specified'}
              </span>
            </span>
          </div>
          <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3'>
            <span>
              Department:{' '}
              <span className='text-gray-600 dark:text-gray-300'>
                {employee?.employeeDepartment?.name || 'Not specified'}
              </span>
            </span>
          </div>
          <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3'>
            <span>
              Employee Type:{' '}
              <span className='text-gray-600 dark:text-gray-300'>
                {employee?.employeeType}
              </span>
            </span>
          </div>
          <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3'>
            <span>
              Start Date:{' '}
              <span className='text-gray-600 dark:text-gray-300'>
                {format(new Date(employee?.startDate!), 'MM-dd-yyyy')}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
