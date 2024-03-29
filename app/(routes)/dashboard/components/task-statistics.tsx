'use client';

import { Task } from '@prisma/client';
import { FC } from 'react';
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

interface taskStatisticsProps {
  tasks: Task[];
}

const COLORS = {
  Backlog: '#0088FE',
  Todo: '#FF8042',
  'In progress': '#FFBB28',
  Done: '#00C49F',
  Cancelled: '#888888',
};

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const TaskStatistics: FC<taskStatisticsProps> = ({ tasks }) => {
  const statusCounts = tasks.reduce((acc, task) => {
    // @ts-ignore
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(statusCounts).map((status) => ({
    name: status,
    // @ts-ignore
    value: statusCounts[status],
  }));

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              // @ts-ignore
              <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskStatistics;
