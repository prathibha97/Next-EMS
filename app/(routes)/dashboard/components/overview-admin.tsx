'use client';

import { TaskWork, Employee } from '@prisma/client';
import { FC, useState, useEffect } from 'react';
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

interface WorkedHoursOverviewAdminProps {
  workedHours: TaskWork[];
}

const WorkedHoursOverviewAdmin: FC<WorkedHoursOverviewAdminProps> = ({
  workedHours,
}) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/api/employees');
        const data = await response.json();
        setEmployees(data);
        if (data.length > 0) {
          setSelectedEmployee(data[0].id); // Set the first employee's id as default
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEmployeeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedEmployee(event.target.value);
  };

  let filteredWorkedHours = workedHours;
  if (selectedEmployee !== '') {
    // Ensure selectedEmployee is not empty
    filteredWorkedHours = workedHours.filter(
      (workedHour) => workedHour.employeeId === selectedEmployee
    );
  }

  const monthlyHours = filteredWorkedHours.reduce((acc, workedHour) => {
    const month = new Date(workedHour.date).getMonth(); // Extract the month
    //@ts-ignore
    const totalHours = acc[month] || 0;
    //@ts-ignore
    acc[month] = totalHours + workedHour.hoursWorked;
    return acc;
  }, {});

  const data = Object.keys(monthlyHours).map((month) => ({
    name: new Date(2024, parseInt(month), 1).toLocaleString('default', {
      month: 'short',
    }),
    //@ts-ignore
    hours: monthlyHours[month],
  }));

  return (
    <div className="w-full">
      <div className="ml-4 w-fit border p-2 rounded-md">
        <label htmlFor="employee" className="text-sm text-gray-600">
          Select Employee:
        </label>
        <select
          id="employee"
          value={selectedEmployee}
          onChange={handleEmployeeChange}
          className="font-medium"
        >
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
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
    </div>
  );
};

export default WorkedHoursOverviewAdmin;
