import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useEmployee from '@/hooks/useEmployee';
import prisma from '@/lib/prisma';
import AllAnalytics from './components/all-analytics/all-analytics';
import { columns } from './components/columns';
import DepartmentAnalytics from './components/department-analytics/department-analytics';
import { PayrollDataTable } from './components/payroll-data-table';
import RecentMonths from './components/recent-months';
import TabList from './components/tab-list';

const PayrollsPage = async () => {
  const { getAllEmployees } = useEmployee();
  const employeeData = await getAllEmployees();

  const payrollData = await prisma.payroll.findMany({});

 const departments = await prisma.department.findMany({});

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


 const payrollDataByDepartment = await Promise.all(
   departments.map(async (department) => {
     const departmentPayrollData = await prisma.payroll.findMany({
       where: {
         employee: {
           departmentId: department.id,
         },
       },
     });

     // Create department-specific monthly data
     const departmentMonthlyEpfEtfData = departmentPayrollData.reduce(
       (acc, data) => {
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
       },
       {}
     );

     // Transform the grouped data into the format you need for rendering
     const departmentMonthlyData = Object.entries(
       departmentMonthlyEpfEtfData
     ).map(([month, data]) => ({
       month,
       epf: data.reduce((sum, item) => sum + item.epf, 0),
       etf: data.reduce((sum, item) => sum + item.etf, 0),
       total: data.reduce((sum, item) => sum + item.total, 0),
     }));

     return {
       departmentId: department.id,
       payrollData: departmentPayrollData,
       monthlyData: departmentMonthlyData, // Include department-specific monthly data
     };
   })
 );

  
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
              <TabList departments={departments} />
            </div>
            <TabsContent value='all'>
              <RecentMonths monthlyData={monthlyEpfEtfData} />
              <AllAnalytics payrollData={payrollData} />
            </TabsContent>

            {payrollDataByDepartment.map(
              ({ departmentId, payrollData, monthlyData }) => (
                <TabsContent key={departmentId} value={departmentId}>
                  <RecentMonths monthlyData={monthlyData} />
                  <DepartmentAnalytics payrollData={payrollData} />
                </TabsContent>
              )
            )}
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollsPage;
