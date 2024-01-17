import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Payroll } from '@prisma/client';
import { FC } from 'react';
import MonthlyStatistics from './monthly-statistics';
import YearlyStatistics from './yearly-statistics';

interface DepartmentAnalyticsProps {
  payrollData: Payroll[];
}

const DepartmentAnalytics: FC<DepartmentAnalyticsProps> = ({ payrollData }) => {
  return (
    <div className='bg-slate-200 mt-10 p-4 drop-shadow-md rounded-lg '>
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

export default DepartmentAnalytics;
