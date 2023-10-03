'use client';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loanData } from '@/constants/sample/loan-data';
import Image from 'next/image';
import { Loancolumns } from './loan-columns';
import { LoanDataTable } from './loan-datatable';

interface AddLoanProps {}

const AddLoan: FC<AddLoanProps> = ({}) => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='bg-gray-200 p-4'>
        {' '}
        <div className='bg-[#fff] m-8 rounded-lg pb-6 drop-shadow-lg'>
          <div className='p-4'>
            <Image
              className='mt-6'
              src='/icons/loan-image.png'
              alt='Image 1'
              width={300}
              height={300}
            />
          </div>
          <div>
            <div className='text-2xl text-[#2ebdaa] font-medium text-center mt-6'>
              Loan
            </div>
            <div className='text-center my-4 text-slate-800'>
              In this section, employees can receive their <br></br>
              requested loan amounts.
            </div>
          </div>
          <div>
            <div className='flex gap-4 p-4 mb-4'>
              <Button variant='outline'>Date</Button>
              <Input />
            </div>

            <div className='text-center'>
              <Button className='bg-[#2ebdaa] text-white' variant='outline'>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-blue-200 p-4'>
        {' '}
        <LoanDataTable columns={Loancolumns} data={loanData} />
      </div>
    </div>
  );
};

export default AddLoan;
