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
    name: 'Jan',
    hours: Math.floor(Math.random() * 100) + 100,
  },
  {
    name: 'Feb',
    hours: Math.floor(Math.random() * 100) + 100,
  },
  {
    name: 'Mar',
    hours: Math.floor(Math.random() * 100) + 100,
  },
  {
    name: 'Apr',
    hours: Math.floor(Math.random() * 100) + 100,
  },
  {
    name: 'May',
    hours: Math.floor(Math.random() * 100) + 100,
  },
  {
    name: 'Jun',
    hours: Math.floor(Math.random() * 100) + 100,
  },
  {
    name: 'Jul',
    hours: Math.floor(Math.random() * 100) + 100,
  },
  {
    name: 'Aug',
    hours: Math.floor(Math.random() * 100) + 100,
  },
  {
    name: 'Sep',
    hours: Math.floor(Math.random() * 100) + 100,
  },
  {
    name: 'Oct',
    hours: Math.floor(Math.random() * 100) + 100,
  },
  {
    name: 'Nov',
    hours: Math.floor(Math.random() * 100) + 100,
  },
  {
    name: 'Dec',
    hours: Math.floor(Math.random() * 100) + 100,
  },
];

export function Overview() {
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
            dataKey="name"
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
            dataKey="hours"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
