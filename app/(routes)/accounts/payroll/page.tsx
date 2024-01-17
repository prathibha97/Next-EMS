import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useEmployee from '@/hooks/useEmployee';
import prisma from '@/lib/prisma';
import AllAnalytics from './components/all-analytics/all-analytics';
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

  const payrollData = await prisma.payroll.findMany({});

  const getFormattedMonth = (monthYear: string) => {
    const [year, month] = monthYear.split('-');
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
  };

  // Create an object to group data by month
  const groupedMonthlyEpfEtfData = payrollData.reduce((acc, data) => {
    const month = getFormattedMonth(data.monthYear);
    const newData = {
      epf: data.companyEpfContribution,
      etf: data.companyEtfContribution,
      total: data.companyEpfContribution + data.companyEtfContribution,
    };

    if (!acc[month]) {
      acc[month] = [newData];
    } else {
      acc[month].push(newData);
    }

    return acc;
  }, {});

  // Transform the grouped data into the format you need for rendering
  const monthlyEpfEtfData = Object.entries(groupedMonthlyEpfEtfData).map(
    ([month, data]) => ({
      month,
      epf: data.reduce((sum, item) => sum + item.epf, 0),
      etf: data.reduce((sum, item) => sum + item.etf, 0),
      total: data.reduce((sum, item) => sum + item.total, 0),
    })
  );

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
              <RecentMonths monthlyData={monthlyEpfEtfData} />
              <AllAnalytics payrollData={payrollData} />
            </TabsContent>
            <TabsContent value='software'>
              <RecentMonths monthlyData={monthlyEpfEtfData} />
              <SoftwareAnalytics />
            </TabsContent>
            <TabsContent value='hr'>
              <RecentMonths monthlyData={monthlyEpfEtfData} />
              <HRAnalytics />
            </TabsContent>
            <TabsContent value='DigitalArts'>
              <RecentMonths monthlyData={monthlyEpfEtfData} />
              <DigitalArtsAnalytics />
            </TabsContent>
            <TabsContent value='Marketing'>
              <RecentMonths monthlyData={monthlyEpfEtfData} />
              <MarketingAnalytics />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollsPage;
