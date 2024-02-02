import prisma from '@/lib/prisma';
import { FC } from 'react';
import ViewEmployee from './components/view-employee';

export const revalidate = 0;

interface EmployeeProps {
  params: {
    employeeId: string;
  };
}

const Employee: FC<EmployeeProps> = async ({ params }) => {
  const { employeeId } = params;

  const employee = await prisma.employee.findUnique({
    where: {
      id: employeeId,
    },
  });

  return <ViewEmployee employee={employee} />;
};

export default Employee;
