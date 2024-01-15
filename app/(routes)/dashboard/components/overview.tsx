'use client';

import { TaskWork } from '@prisma/client';
import { FC } from 'react';
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

interface WorkedHoursOverviewProps {
  workedHours: TaskWork[];
}

const WorkedHoursOverview: FC<WorkedHoursOverviewProps> = ({ workedHours }) => {
  const monthlyHours = workedHours.reduce((acc, workedHour) => {
    const month = new Date(workedHour.date).getMonth(); // Extract the month
    // @ts-ignore
    const totalHours = acc[month] || 0;
    // @ts-ignore
    acc[month] = totalHours + workedHour.hoursWorked;
    return acc;
  }, {});

  const data = Object.keys(monthlyHours).map((month) => ({
    name: new Date(2024, parseInt(month), 1).toLocaleString('default', {
      month: 'short',
    }),
    // @ts-ignore
    hours: monthlyHours[month],
  }));

  console.log(data);

  return (
    <div className="w-full">
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
            dataKey="hours"
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
};

export default WorkedHoursOverview;
