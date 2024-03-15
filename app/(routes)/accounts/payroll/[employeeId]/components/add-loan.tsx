import { FC } from 'react';

import prisma from '@/lib/prisma';
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
    orderBy:{
      createdAt: 'desc'
    }
  });
  return (
    <div className='flex flex-col gap-7'>
      <div className='border p-5 rounded-md'>
        <div className='text-2xl font-semibold'>Loans</div>
        <div className='my-4 text-slate-800'>
          In this section, employees can receive their requested loan amounts.
        </div>
        <div>
          <LoanForm />
        </div>
      </div>
      <div className='border p-5 rounded-md'>
        <div className='text-2xl font-semibold'>Loan History</div>
        <div className='my-4 text-slate-800'>
          Loan history of selected employee
        </div>
        <LoanDataTable columns={LoanColumns} data={loanData} />
      </div>
    </div>
  );
};

export default AddLoan;
