'use client';

import { TaskWork } from '@prisma/client';
import { FC, useState } from 'react';
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

// interface WorkedHoursOverviewAdminProps {
//   workedHours: TaskWork[];
// }

// const WorkedHoursOverviewAdmin: FC<WorkedHoursOverviewAdminProps> = ({
//   workedHours,
// }) => {
//   const employeeMonthlyHours = workedHours.reduce((acc, workedHour) => {
//     const employeeId = workedHour.employeeId;
//     const employeeName = workedHour.employee.name;
//     const key = `${employeeId}`;

//     if (!acc[key]) {
//       acc[key] = {
//         name: `${employeeName}`,
//         totalHours: Array(12).fill(0), // Initialize an array for 12 months
//       };
//     }

//     // Accumulate total hours for each month
//     const month = new Date(workedHour.date).getMonth();
//     acc[key].totalHours[month] += workedHour.hoursWorked;

//     return acc;
//   }, {});

//   // ...

//   const data = Object.values(employeeMonthlyHours).map((employee) => ({
//     name: employee.name,
//     data: employee.totalHours.map((hours, index) => ({
//       name: new Date(2024, index, 1).toLocaleString('default', {
//         month: 'short',
//       }),
//       hours: hours,
//     })),
//   }));

//   console.log(data);

interface WorkedHoursOverviewAdminProps {
  workedHours: TaskWork[];
}

const WorkedHoursOverviewAdmin: FC<WorkedHoursOverviewAdminProps> = ({
  workedHours,
}) => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  const employeeMonthlyHours = workedHours.reduce((acc, workedHour) => {
    const employeeId = workedHour.employeeId;
    const employeeName = workedHour.employee.name;
    const key = `${employeeId}`;

    if (!acc[key]) {
      acc[key] = {
        name: `${employeeName}`,
        totalHours: Array(12).fill(0), // Initialize an array for 12 months
      };
    }

    // Filter by selected year
    const workYear = new Date(workedHour.date).getFullYear();
    if (workYear === selectedYear) {
      // Accumulate total hours for each month
      const month = new Date(workedHour.date).getMonth();
      acc[key].totalHours[month] += workedHour.hoursWorked;
    }

    return acc;
  }, {});

  // ...

  const data = Object.values(employeeMonthlyHours).map((employee) => ({
    name: employee.name,
    data: employee.totalHours.map((hours, index) => ({
      name: new Date(selectedYear, index, 1).toLocaleString('default', {
        month: 'short',
      }),
      hours: hours,
    })),
  }));

  console.log(data);

  return (
    <div className="w-full">
      <div className="flex justify-end">
        <select
          className="border"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {/* You may customize the available years based on your use case */}
          <option value={2022}>2022</option>
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
          {/* Add more years as needed */}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          width={500}
          height={300}
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
          {data.map((employee) => (
            <Line
              key={employee.name}
              type="monotone"
              data={employee.data}
              dataKey="hours"
              name={employee.name}
              stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkedHoursOverviewAdmin;
