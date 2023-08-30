import { Separator } from '@/components/ui/separator';
import { Employee } from '@prisma/client';
import { FC } from 'react'

interface HRSettingsProps {
  employee: Employee | undefined;
}

const HRSettings: FC<HRSettingsProps> = ({employee}) => {

  return (
    <>
      <div className='flex justify-between'>
        {/* Status */}
        <div>
          <h2 className='text-lg font-semibold'>Status</h2>
          <Separator className='mt-1 mb-3' />
          <div className='flex flex-col gap-y-4'>
            <span>
              Employee Type :{' '}
              <span className='text-sm text-gray-600 dark:text-gray-300'>
                {employee?.employeeType}
              </span>
            </span>

            <span>
              Related User:{' '}
              <span className='text-sm text-gray-600 dark:text-gray-300'>
                {/* @ts-ignore */}
                {employee?.user?.email || 'No user related'}
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default HRSettings