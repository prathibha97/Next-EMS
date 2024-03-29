import { getAuthSession } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

const useEmployee = () => {
  const getAllEmployees = async () => {
    const employees = await prisma.employee.findMany({
      include: {
        employeeDepartment: true,
      },
    });
    return employees;
  };
  const getLoggedInEmployee = async () => {
    const session = await getAuthSession();
    const employee = await prisma.employee.findFirst({
      where: {
        userId: session?.user.id,
      },
      include: {
        leaveBalance: true,
        Department: true,
        employeeDepartment:true
      },
    });
    return employee;
  };
  const getEmployeeById = async (employeeId: string) => {
    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
      include: {
        Payroll: true,
      },
    });
    return employee;
  };
  return { getAllEmployees, getLoggedInEmployee, getEmployeeById };
};

export default useEmployee;
