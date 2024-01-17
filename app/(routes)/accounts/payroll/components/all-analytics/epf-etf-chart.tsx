'use client';
import { FC } from 'react';
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

interface EPFETFChartProps {
  data: any;
}

const EPFETFChart: FC<EPFETFChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={350}>
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
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='month' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='epf' fill='#8884d8' name='EPF' />
        <Bar dataKey='etf' fill='#82ca9d' name='ETF' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EPFETFChart;
