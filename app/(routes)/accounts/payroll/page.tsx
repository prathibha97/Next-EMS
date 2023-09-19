import useEmployee from '@/hooks/useEmployee';
import { columns } from './components/columns';
import { PayrollDataTable } from './components/payroll-data-table';

const PayrollsPage = async () => {
  const { getAllEmployees } = useEmployee();
  const employeeData = await getAllEmployees();
  return (
    <div>
      <PayrollDataTable columns={columns} data={employeeData} />
    </div>
  );
};

export default PayrollsPage;
