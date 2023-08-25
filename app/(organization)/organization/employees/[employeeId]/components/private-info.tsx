import { Separator } from '@/components/ui/separator';
import { FC } from 'react'

interface PrivateInfoProps {
  
}

const PrivateInfo: FC<PrivateInfoProps> = ({}) => {
  return (
    <>
      <div className='flex justify-between'>
        {/* Private Contact */}
        <div>
          <h2 className='text-lg font-semibold'>Private Contact</h2>
          <Separator className='mt-1 mb-3' />
          <div className='flex flex-col gap-y-4'>
            <div className='flex gap-x-2'>
              <span>Private Address: </span>
              <div className='flex flex-col'>
                <span className='text-sm text-gray-600'>147/6 Pallewatte,</span>
                <span className='text-sm text-gray-600'>
                  Uduwawala, Katugastota,
                </span>
                <div className='flex gap-x-8 text-sm text-gray-600'>
                  <span>Kandy</span>
                  <span>Central</span>
                  <span>20800</span>
                  <span>Sri Lanka</span>
                </div>
              </div>
            </div>
            <span>
              Personal Email :{' '}
              <span className='text-sm text-gray-600'>prsthibha@gmail.com</span>
            </span>
            <span>
              Phone : <span className='text-sm text-gray-600'>0772940633</span>
            </span>
            <span>
              Bank Account Number :{' '}
              <span className='text-sm text-gray-600'>123456789</span>
            </span>
          </div>
        </div>

        {/* Family Status */}
        <div>
          <h2 className='text-lg font-semibold'>Family Status</h2>
          <Separator className='mt-1 mb-3' />
          <div className='flex flex-col gap-y-4'>
            <span>
              Marital Status :{' '}
              <span className='text-sm text-gray-600'>Single</span>
            </span>
            <span>
              Number of dependent children :{' '}
              <span className='text-sm text-gray-600'>0</span>
            </span>
          </div>
        </div>
      </div>

      {/* Emergency contacts */}
      <div className='flex justify-between mt-5'>
        <div>
          <h2 className='text-lg font-semibold'>Emergency Contact</h2>
          <Separator className='mt-1 mb-3' />
          <div className='flex flex-col gap-y-4'>
            <span>
              Contact Name :{' '}
              <span className='text-sm text-gray-600'>Devika Ratnayake</span>
            </span>
            <span>
              Contact Number :{' '}
              <span className='text-sm text-gray-600'>07712345678</span>
            </span>
          </div>
        </div>

        {/* Citizenship*/}

        <div>
          <h2 className='text-lg font-semibold'>Citizenship</h2>
          <Separator className='mt-1 mb-3' />
          <div className='flex flex-col gap-y-4'>
            <span>
              Nationality :{' '}
              <span className='text-sm text-gray-600'>Sri Lankan</span>
            </span>
            <span>
              Identification Number :{' '}
              <span className='text-sm text-gray-600'>972643580V</span>
            </span>
            <span>
              Gender : <span className='text-sm text-gray-600'>Male</span>
            </span>
            <span>
              date of Birth :{' '}
              <span className='text-sm text-gray-600'>09/20/1997</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivateInfo