import prisma from '@/lib/prisma';

const useWorkedHours = () => {
  const getWorkedHoursByEmployeeId = async (employeeId: string) => {
    const workedHours = await prisma.taskWork.findMany({
      where: {
        employeeId: employeeId,
      },
    });
    return workedHours;
  };

  const getWorkedHoursAllEmployees = async () => {
    const workedHours = await prisma.taskWork.findMany({
      include:{
        employee:{
          select:{id:true, name: true} 
        }
      }
    });
    return workedHours;
  };

  return {
    getWorkedHoursByEmployeeId,
    getWorkedHoursAllEmployees,
  };
};

export default useWorkedHours;
