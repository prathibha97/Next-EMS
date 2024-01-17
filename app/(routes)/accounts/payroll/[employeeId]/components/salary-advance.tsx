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
    <div className="flex flex-col gap-7">
      <div className="border p-5 rounded-md">
        <div className="text-2xl font-semibold">Salary Advance</div>
        <div className="my-4 text-slate-800">
          When an employee requires a salary advance, the funds can be provided
          through this section.
        </div>
        <div>
          <SalaryAdvanceForm />
        </div>
      </div>
      <div className="border p-5 rounded-md">
        <div className="text-2xl font-semibold">Salary Advance History</div>
        <div className="my-4 text-slate-800">
          When an employee requires a salary advance, the funds can be provided
          through this section.
        </div>
        <SalaryAdvanceDataTable
          columns={SalaryAdvanceColumns}
          data={salaryAdvanceData}
          searchFilter="amount"
          placeholder="Date"
        />
      </div>
    </div>
  );
};

export default SalaryAdvance;
