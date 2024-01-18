'use client';

import { FC } from 'react';
import { EmployeeWithPayroll } from '@/types';
import { Payroll } from '@prisma/client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface PayrollInsightsChartProps {
  payrolls: EmployeeWithPayroll | undefined;
}

const PayrollInsightsChart: FC<PayrollInsightsChartProps> = ({ payrolls }) => {
  const data = payrolls?.map((payroll: Payroll) => ({
    monthYear: payroll.monthYear,
    totalEarnings: payroll.totalEarnings,
    totalDeductions: payroll.totalDeductions,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="monthYear" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalEarnings" fill="#8884d8" name="Total Earnings" />
        <Bar dataKey="totalDeductions" fill="#82ca9d" name="Total Deductions" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PayrollInsightsChart;
