'use client'
import { efpEtfData } from '@/constants/sample/epf-etf-data';
import { FC } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface EPFETFChartProps {}

const EPFETFChart: FC<EPFETFChartProps> = ({}) => {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart
        width={500}
        height={300}
        data={efpEtfData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='EPF' fill='#8884d8' />
        <Bar dataKey='ETF' fill='#82ca9d' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EPFETFChart;
