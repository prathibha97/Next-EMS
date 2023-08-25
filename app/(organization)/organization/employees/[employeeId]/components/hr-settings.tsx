import { Separator } from '@/components/ui/separator';
import { FC } from 'react'

interface HRSettingsProps {
  
}

const HRSettings: FC<HRSettingsProps> = ({}) => {
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
              <span className='text-sm text-gray-600'>Employee</span>
            </span>

            <span>
              Related User:{' '}
              <span className='text-sm text-gray-600'>Prathibha Ratnayake</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default HRSettings