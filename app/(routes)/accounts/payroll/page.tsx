import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useEmployee from '@/hooks/useEmployee';
import { columns } from './components/columns';
import { PayrollDataTable } from './components/payroll-data-table';

const PayrollsPage = async () => {
  const { getAllEmployees } = useEmployee();
  const employeeData = await getAllEmployees();
  return (
    <div>
      <Tabs defaultValue='payroll'>
        <TabsList>
          <TabsTrigger value='payroll'>Payroll</TabsTrigger>
          <TabsTrigger value='analytics'>Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value='payroll' className='mt-5'>
          <PayrollDataTable columns={columns} data={employeeData} />
        </TabsContent>
        <TabsContent value='analytics' className='mt-5'>
          Add charts here.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollsPage;
