import LinkButton from '@/components/buttons/link-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import usePayroll from '@/hooks/usePayroll';
import { FC } from 'react';
import AddLoan from './components/add-loan';
import AddSalary from './components/add-salary';
import { columns } from './components/columns';
import { PaySheetDataTable } from './components/paysheet-table';
import SalaryAdvance from './components/salary-advance';
import { SalaryAdvanceDataTable } from './components/advance-datagrid';
import { SalaryAdvanceColumns } from './components/advance-column';
import { salaryAdvanceData } from '@/constants/sample/salary-advance';
import { LoanDataTable } from './components/loan-datatable';
import { Loancolumns } from './components/loan-columns';
import { loanData } from '@/constants/sample/loan-data';

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
            <SalaryAdvance />
            <AddLoan />
          </div>
          <PaySheetDataTable data={payrolls} columns={columns} />
          <LinkButton link={`/accounts/payroll`} label='Go Back' />
        </TabsContent>
        <TabsContent value='advance' className='mt-5'>
          Add Salary Advance content here.
          <SalaryAdvanceDataTable
            columns={SalaryAdvanceColumns}
            data={salaryAdvanceData}
            searchFilter='amount'
            placeholder='Amount'
          />

        </TabsContent>
        <TabsContent value='loan' className='mt-5'>
          Add loan here
          <LoanDataTable columns={Loancolumns} data={loanData}/>
        </TabsContent>
        <TabsContent value='analytics' className='mt-5'>
          Add charts here.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollPage;
