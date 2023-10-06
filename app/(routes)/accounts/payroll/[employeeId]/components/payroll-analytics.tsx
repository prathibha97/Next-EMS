'use client';
import { EmployeeWithPayroll } from '@/types';
import { Payroll } from '@prisma/client';
import { FC } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

interface PayrollAnalyticsProps {
  employee: EmployeeWithPayroll | undefined;
}

const PayrollAnalytics: FC<PayrollAnalyticsProps> = ({ employee }) => {
  // @ts-ignore
  const data = employee.Payroll.map((payroll: Payroll) => ({
    name: payroll.monthYear,
    companyEpfContribution: payroll.companyEpfContribution,
    companyEtfContribution: payroll.companyEtfContribution,
  }));

  return (
    <div className='flex justify-center items-center h-full w-full mx-auto'>
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid stroke='#eee' strokeDasharray='5 5' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type='monotone'
        dataKey='companyEpfContribution'
        stroke='#8884d8'
        activeDot={{ r: 8 }}
      />
      <Line
        type='monotone'
        dataKey='companyEtfContribution'
        stroke='#82ca9d'
        activeDot={{ r: 8 }}
      />
    </LineChart>
    </div>
  );
};

export default PayrollAnalytics;
