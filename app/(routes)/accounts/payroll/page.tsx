import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useEmployee from '@/hooks/useEmployee';
import prisma from '@/lib/prisma';
import AllAnalytics from './components/all-analytics';
import { columns } from './components/columns';
import DigitalArtsAnalytics from './components/digital-arts-analytics';
import HRAnalytics from './components/hr-analytics';
import MarketingAnalytics from './components/marketing-analytics';
import { PayrollDataTable } from './components/payroll-data-table';
import RecentMonths from './components/recent-months';
import SoftwareAnalytics from './components/software-analytics';
import TabList from './components/tab-list';

const PayrollsPage = async () => {
  const { getAllEmployees } = useEmployee();
  const employeeData = await getAllEmployees();
  
const payrollData = await prisma.payroll.findMany({
  include: {
    employee: {
      include: {
        employeeDepartment: true,
      },
    },
  },
});
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
          <Tabs defaultValue='all' className='w-full'>
            <div className='flex justify-center'>
              <TabList />
            </div>
            <TabsContent value='all'>
              <RecentMonths />
              <AllAnalytics payrollData={payrollData} />
            </TabsContent>
            <TabsContent value='software'>
              <RecentMonths />
              <SoftwareAnalytics />
            </TabsContent>
            <TabsContent value='hr'>
              <RecentMonths />
              <HRAnalytics />
            </TabsContent>
            <TabsContent value='DigitalArts'>
              <RecentMonths />
              <DigitalArtsAnalytics />
            </TabsContent>
            <TabsContent value='Marketing'>
              <RecentMonths />
              <MarketingAnalytics />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollsPage;
