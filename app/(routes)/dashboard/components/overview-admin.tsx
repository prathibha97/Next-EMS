'use client';

import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  {
    month: 'Jan',
    emp1: Math.floor(Math.random() * 100) + 100,
    emp2: Math.floor(Math.random() * 100) + 100,
  },
  {
    month: 'Feb',
    emp1: Math.floor(Math.random() * 100) + 100,
    emp2: Math.floor(Math.random() * 50) + 100,
  },
  {
    month: 'Mar',
    emp1: Math.floor(Math.random() * 100) + 100,
    emp2: Math.floor(Math.random() * 50) + 100,
  },
  {
    month: 'Apr',
    emp1: Math.floor(Math.random() * 100) + 100,
    emp2: Math.floor(Math.random() * 50) + 100,
  },
  {
    month: 'May',
    emp1: Math.floor(Math.random() * 100) + 100,
    emp2: Math.floor(Math.random() * 50) + 100,
  },
  {
    month: 'Jun',
    emp1: Math.floor(Math.random() * 100) + 100,
    emp2: Math.floor(Math.random() * 50) + 100,
  },
  {
    month: 'Jul',
    emp1: Math.floor(Math.random() * 100) + 100,
    emp2: Math.floor(Math.random() * 50) + 100,
  },
  {
    month: 'Aug',
    emp1: Math.floor(Math.random() * 100) + 100,
    emp2: Math.floor(Math.random() * 50) + 100,
  },
  {
    month: 'Sep',
    emp1: Math.floor(Math.random() * 100) + 100,
    emp2: Math.floor(Math.random() * 50) + 100,
  },
  {
    month: 'Oct',
    emp1: Math.floor(Math.random() * 100) + 100,
    emp2: Math.floor(Math.random() * 50) + 100,
  },
  {
    month: 'Nov',
    emp1: Math.floor(Math.random() * 100) + 100,
    emp2: Math.floor(Math.random() * 50) + 100,
  },
  {
    month: 'Dec',
    emp1: Math.floor(Math.random() * 100) + 100,
    emp2: Math.floor(Math.random() * 50) + 100,
  },
];

export function OverviewAdmin() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
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
          <XAxis
            dataKey="month"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `Hours ${value}`}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="emp1"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="emp2"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
