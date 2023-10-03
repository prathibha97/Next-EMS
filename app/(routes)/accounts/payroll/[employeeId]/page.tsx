import LinkButton from '@/components/buttons/link-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { loanData } from '@/constants/sample/loan-data';
import usePayroll from '@/hooks/usePayroll';
import { FC } from 'react';
import AddSalary from './components/add-salary';
import { SalaryAdvanceColumns } from './components/advance-column';
import { SalaryAdvanceDataTable } from './components/advance-datagrid';
import { columns } from './components/columns';
import { Loancolumns } from './components/loan-columns';
import { LoanDataTable } from './components/loan-datatable';
import { PaySheetDataTable } from './components/paysheet-table';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import SalaryAdvanceForm from './components/advance-form';

interface PayrollPageProps {
  params: {
    employeeId: string;
  };
}

const PayrollPage: FC<PayrollPageProps> = async ({ params }) => {
  const { employeeId } = params;
  const { getPayrollByEmployee } = usePayroll();
  const payrolls = await getPayrollByEmployee(employeeId);

  const salaryAdvanceData = await prisma.salaryAdvance.findMany({
    where: {
      employeeId: employeeId,
    },
  });

  return (
    <div>
      <Tabs defaultValue='payroll'>
        <TabsList>
          <TabsTrigger value='payroll'>Payroll</TabsTrigger>
          <TabsTrigger value='advance'>Salary Advance</TabsTrigger>
          <TabsTrigger value='loan'>Loans</TabsTrigger>
          <TabsTrigger value='analytics'>Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value='payroll' className='mt-5'>
          <h1 className='text-2xl font-semibold mb-5'>
            Payroll of {payrolls[0]?.employee.name || 'employee is not set yet'}
          </h1>
          <div className='flex gap-4 rounded-md'>
            <AddSalary employeeId={employeeId} />
          </div>
          <PaySheetDataTable data={payrolls} columns={columns} />
          <LinkButton link={`/accounts/payroll`} label='Go Back' />
        </TabsContent>
        <TabsContent value='advance' className='mt-5'>
          Add Salary Advance content here.
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
                    When an employee requires a salary advance,<br></br> the
                    funds can be provided through this section.
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
        </TabsContent>
        <TabsContent value='loan' className='mt-5'>
          Add loan here
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
                    <Button
                      className='bg-[#2ebdaa] text-white'
                      variant='outline'
                    >
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
          {/* <LoanDataTable columns={Loancolumns} data={loanData}/> */}
        </TabsContent>
        <TabsContent value='analytics' className='mt-5'>
          Add charts here.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollPage;
