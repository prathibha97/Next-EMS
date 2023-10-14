import prisma from '@/lib/prisma';

const useTasks = () => {
  const getAllTasks = async () => {
    const tasks = await prisma.task.findMany({
      include: {
        project: {
          select: {
            name: true,
            id: true
          },
        },
      },
    });
    return tasks;
  };

  const getTaskById = async (taskId: string) => {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
      include: {
        project: {
          select: {
            name: true,
          },
        },
      },
    });
    return task;
  };
  const getTaskByUser = async (userId: string) => {
    const tasks = await prisma.task.findMany({
      where: {
        project: {
          projectAssignees: {
            some: {
              employee: {
                userId: userId,
              },
            },
          },
        },
      },
      include: {
        project: {
          select: {
            name: true,
          },
        },
      },
    });
    return tasks;
  };
  return { getAllTasks, getTaskById, getTaskByUser };
};

export default useTasks;
