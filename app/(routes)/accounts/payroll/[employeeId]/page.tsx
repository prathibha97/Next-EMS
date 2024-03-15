import LinkButton from '@/components/buttons/link-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import usePayroll from '@/hooks/usePayroll';
import { FC } from 'react';
import AddSalary from './components/add-salary';
import { columns } from './components/columns';
import { PaySheetDataTable } from './components/paysheet-table';

import AddLoan from './components/add-loan';
import PayrollInsightsChart from './components/payroll-analytics';
import SalaryAdvance from './components/salary-advance';

interface PayrollPageProps {
  params: {
    employeeId: string;
  };
}

const PayrollPage: FC<PayrollPageProps> = async ({ params }) => {
  const { employeeId } = params;
  const { getPayrollByEmployee } = usePayroll();
  const payrolls = await getPayrollByEmployee(employeeId);

  return (
    <>
      <div className='hidden md:block'>
        <Tabs defaultValue='payroll'>
          <TabsList className=''>
            <TabsTrigger value='payroll'>Payroll</TabsTrigger>
            <TabsTrigger value='advance'>Salary Advance</TabsTrigger>
            <TabsTrigger value='loan'>Loans</TabsTrigger>
            <TabsTrigger value='analytics'>Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value='payroll' className='mt-5'>
            <h1 className='text-2xl font-semibold mb-5'>
              Payroll of{' '}
              {payrolls[0]?.employee.name || 'employee is not set yet'}
            </h1>
            <div className='flex gap-4 rounded-md'>
              <AddSalary employeeId={employeeId} />
            </div>
            <PaySheetDataTable data={payrolls} columns={columns} />
            <LinkButton link={`/accounts/payroll`} label='Go Back' />
          </TabsContent>
          <TabsContent value='advance' className='mt-5'>
            <SalaryAdvance employeeId={employeeId} />
          </TabsContent>
          <TabsContent value='loan' className='mt-5'>
            <AddLoan employeeId={employeeId} />
          </TabsContent>
          <TabsContent value='analytics' className='mt-5'>
            {/* <PayrollAnalyticsPage employeeId={employeeId} /> */}
            <PayrollInsightsChart payrolls={payrolls} />
          </TabsContent>
        </Tabs>
      </div>

      <div className='md:hidden'>
        <Tabs defaultValue='payroll'>
          <TabsList className='grid grid-cols-2 bg-[#f1f5f9] h-[80px]'>
            <TabsTrigger value='payroll'>Payroll</TabsTrigger>
            <TabsTrigger value='advance'>Salary Advance</TabsTrigger>
            <TabsTrigger value='loan'>Loans</TabsTrigger>
            <TabsTrigger value='analytics'>Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value='payroll' className='mt-8'>
            <h1 className='text-2xl text-center font-semibold mb-5'>
              Payroll of{' '}
              {payrolls[0]?.employee.name || 'employee is not set yet'}
            </h1>
            <div className='flex gap-4 justify-center rounded-md'>
              <AddSalary employeeId={employeeId} />
            </div>
            <PaySheetDataTable data={payrolls} columns={columns} />
            <LinkButton link={`/accounts/payroll`} label='Go Back' />
          </TabsContent>
          <TabsContent value='advance' className='mt-5'>
            <SalaryAdvance employeeId={employeeId} />
          </TabsContent>
          <TabsContent value='loan' className='mt-5'>
            <AddLoan employeeId={employeeId} />
          </TabsContent>
          <TabsContent value='analytics' className='mt-5'>
            {/* <PayrollAnalyticsPage employeeId={employeeId} /> */}
            <PayrollInsightsChart payrolls={payrolls} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default PayrollPage;
