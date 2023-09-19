import prisma from '@/lib/prisma';

const usePayroll = () => {
  const getPayrollByEmployee = async (employeeId: string) => {
    const payrolls = await prisma.payroll.findMany({
      where: {
        employeeId,
      },
      include: {
        employee: {
          select: {
            name: true,
            employeeDepartment: {
              select: {
                name: true,
              },
            },
            employeeNumber: true,
            jobPosition: true,
            bankName: true,
            bankAccountNumber: true,
          },
        },
      },
      orderBy: {
        year: 'desc',
      },
    });
    return payrolls;
  };
  return { getPayrollByEmployee };
};

export default usePayroll;
