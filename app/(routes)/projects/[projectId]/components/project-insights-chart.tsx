import { TaskStatus, Task } from '@prisma/client';
import { FC } from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

interface ProjectInsightsChartProps {
  tasks: Task[];
}

const getStatusColor = (status: TaskStatus): string => {
  switch (status) {
    case 'Backlog':
      return '#FFC400';
    case 'Todo':
      return '#FF6384';
    case 'In_Progress':
      return '#36A2EB';
    case 'Done':
      return '#4CAF50';
    case 'Canceled':
      return '#9C27B0';
    default:
      return '#8884d8';
  }
};

const ProjectInsightsChart: FC<ProjectInsightsChartProps> = ({ tasks }) => {
  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(statusCounts).map((status) => ({
    name: status,
    value: statusCounts[status],
  }));

  return (
    <div className='flex'>
      <div className='mr-8'>
        <PieChart width={400} height={400}>
          <Pie
            dataKey='value'
            data={data}
            nameKey='name'
            cx='50%'
            cy='50%'
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getStatusColor(entry.name as TaskStatus)}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
      <div>
        <h3 className='text-xl font-semibold mb-4'>Project Status Breakdown</h3>
        <ul>
          {data.map((item) => (
            <li key={item.name} className='flex items-center mb-2'>
              <div
                className='w-4 h-4 mr-2 rounded-full'
                style={{
                  backgroundColor: getStatusColor(item.name as TaskStatus),
                }}
              ></div>
              <span>
                {item.name}: {item.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectInsightsChart;
