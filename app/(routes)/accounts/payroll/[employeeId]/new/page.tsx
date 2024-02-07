import useEmployee from '@/hooks/useEmployee';
import { FC } from 'react';
import AddPayrollForm from './components/add-payroll-form';

interface AddPayrollPageProps {
  params: {
    employeeId: string;
  };
}

const AddPayrollPage: FC<AddPayrollPageProps> = async ({ params }) => {
  const { getEmployeeById } = useEmployee();

  const employee = await getEmployeeById(params.employeeId);
  // @ts-ignore
  return <AddPayrollForm employee={employee} />;
};

export default AddPayrollPage;
