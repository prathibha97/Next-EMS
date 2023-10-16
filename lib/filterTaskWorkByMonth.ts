import { TaskWork } from '@prisma/client';

export const filterTaskWorkByMonth = (
  taskWork: TaskWork[],
  targetMonth: number
): TaskWork[] => {
  return taskWork.filter((attendance) => {
    const date = new Date(attendance.date!);
    return date.getUTCMonth() === targetMonth - 1; // Months are 0-indexed
  });
};
