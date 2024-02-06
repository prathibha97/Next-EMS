import prisma from '@/lib/prisma';
import { FC } from 'react';
import EmployeeEditForm from './components/employee-edit-form';

export const revalidate = 0;

interface EmployeeEditPageProps {
  params: {
    employeeId: string;
  };
}

const EmployeeEditPage: FC<EmployeeEditPageProps> = async ({ params }) => {
  const employee = await prisma.employee.findUnique({
    where: {
      id: params.employeeId,
    },
    include: {
      leaveBalance: true,
    },
  });

  const departments = await prisma.department.findMany({});
  return <EmployeeEditForm employee={employee} departments={departments} />;
};

export default EmployeeEditPage;
