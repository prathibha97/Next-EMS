import { Attendance } from '@prisma/client';

export const filterAttendanceByMonth = (
  attendanceList: Attendance[],
  targetMonth: number
): Attendance[] => {
  return attendanceList.filter((attendance) => {
    const date = new Date(attendance.date!);
    return date.getUTCMonth() === targetMonth - 1; // Months are 0-indexed
  });
};
