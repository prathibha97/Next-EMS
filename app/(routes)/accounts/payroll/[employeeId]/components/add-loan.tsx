import { FC } from 'react';

import prisma from '@/lib/prisma';
import Image from 'next/image';
import { LoanColumns } from './loan-columns';
import { LoanDataTable } from './loan-datatable';
import LoanForm from './loan-form';

interface AddLoanProps {
  employeeId: string;
}

const AddLoan: FC<AddLoanProps> = async ({ employeeId }) => {
  const loanData = await prisma.loan.findMany({
    where: {
      employeeId,
    },
  });
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
          <LoanForm />
        </div>
      </div>
      <div className='bg-blue-200 p-4'>
        {' '}
        <LoanDataTable columns={LoanColumns} data={loanData} />
      </div>
    </div>
  );
};

export default AddLoan;
