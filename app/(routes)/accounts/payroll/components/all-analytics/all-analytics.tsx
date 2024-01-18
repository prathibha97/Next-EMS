import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Department, Payroll } from '@prisma/client';
import { FC } from 'react';
import MonthlyStatistics from './monthly-statistics';
import YearlyStatistics from './yearly-statistics';

type EmployeeWithDepartment = Payroll & {
  employeeDepartment: Department;
};

interface AllAnalyticsProps {
  payrollData: EmployeeWithDepartment[];
}

const AllAnalytics: FC<AllAnalyticsProps> = ({ payrollData }) => {
  return (
    <div className='mt-10 rounded-md '>
      <div className='text-xl font-semibold text-center mb-4'>
        ETF & EPF Contribution
      </div>
      <Tabs defaultValue='monthly'>
        <TabsList>
          <TabsTrigger value='monthly'>Monthly</TabsTrigger>
          <TabsTrigger value='yearly'>Yearly</TabsTrigger>
        </TabsList>

        <TabsContent value='monthly'>
          <MonthlyStatistics payrollData={payrollData} />
        </TabsContent>
        <TabsContent value='yearly'>
          <YearlyStatistics payrollData={payrollData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AllAnalytics;
