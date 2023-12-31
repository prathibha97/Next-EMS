'use client';
import { Payroll } from '@prisma/client';
import { FC, useEffect, useState } from 'react';
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
  console.log('data', data);


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
