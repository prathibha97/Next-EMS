import prisma from '@/lib/prisma';
import ViewEmployees from './components/view-employees';

const EmployeesPage = async () => {
  const employees = await prisma.employee.findMany({
    include:{
      employeeDepartment: true
    }
  })

  return <ViewEmployees employees={employees} />;
};

export default EmployeesPage;
