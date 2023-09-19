import prisma from '@/lib/prisma';

const useEmployee = () => {
  const getAllEmployees = async () => {
    const employees = await prisma.employee.findMany({
    include: {
      employeeDepartment: true,
    },
  });
    return employees;
  };
  return { getAllEmployees };
};

export default useEmployee;
