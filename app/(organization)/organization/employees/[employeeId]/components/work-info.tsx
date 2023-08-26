import { Separator } from '@/components/ui/separator';
import { Employee } from '@prisma/client';
import { FC } from 'react';

interface WorkInfoProps {
  employee: Employee
}

const WorkInfo: FC<WorkInfoProps> = ({employee}) => {
  return (
    <>
      <div className='mt-5'>
        <h2 className='text-lg font-semibold'>Location</h2>
        <Separator className='mt-1 mb-3' />
        <div className='flex flex-col gap-y-3'>
          <span>
            Work Address :{' '}
            <span className='text-sm text-gray-600'>
              Sphiria Digital Studio, Kandy
            </span>
          </span>
          <span>
            Work Location :{' '}
            <span className='text-sm text-gray-600'>Remote</span>
          </span>
        </div>
      </div>
      <div className='mt-5'>
        <h2 className='text-lg font-semibold'>Schedule</h2>
        <Separator className='mt-1 mb-3' />
        <div className='flex flex-col gap-y-3'>
          <span>
            Working hours :{' '}
            <span className='text-sm text-gray-600'>
              Standard 40 hours/week
            </span>
          </span>
          <span>
            Timezone :{' '}
            <span className='text-sm text-gray-600'>Asia/Colombo</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default WorkInfo;
