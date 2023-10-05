import { FC } from 'react';

import prisma from '@/lib/prisma';
import Image from 'next/image';
import { SalaryAdvanceColumns } from './advance-column';
import { SalaryAdvanceDataTable } from './advance-datagrid';
import SalaryAdvanceForm from './advance-form';

interface SalaryAdvanceProps {
  employeeId: string;
}

const SalaryAdvance: FC<SalaryAdvanceProps> = async ({ employeeId }) => {
  const salaryAdvanceData = await prisma.salaryAdvance.findMany({
    where: {
      employeeId: employeeId,
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
              src='/icons/salary-advance.png'
              alt='Image 2'
              width={300}
              height={300}
            />
          </div>
          <div>
            <div className='text-2xl text-[#2ebdaa] font-medium text-center mt-6'>
              Salary Advance
            </div>
            <div className='text-center my-4 text-slate-800'>
              When an employee requires a salary advance,<br></br> the funds can
              be provided through this section.
            </div>
          </div>
          <div>
            <SalaryAdvanceForm />
          </div>
        </div>
      </div>
      <div className='bg-blue-200 p-4'>
        <SalaryAdvanceDataTable
          columns={SalaryAdvanceColumns}
          data={salaryAdvanceData}
          searchFilter='amount'
          placeholder='Date'
        />
      </div>
    </div>
  );
};

export default SalaryAdvance;
