import prisma from '@/lib/prisma';

const useAttendance = () => {
  const getAllAttendance = async () => {
    const attendances = await prisma.attendance.findMany({});
    return attendances;
  };

  const getAttendanceByEmployeeId = async (employeeId: string) => {
    const attendances = await prisma.attendance.findMany({
      where: {
        employeeId: employeeId,
      },
      orderBy: {
        date: 'desc',
      },
    });
    return attendances;
  };
  return { getAllAttendance, getAttendanceByEmployeeId };
};

export default useAttendance;
