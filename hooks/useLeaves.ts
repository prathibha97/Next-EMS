import prisma from '@/lib/prisma';

const useLeaves = () => {
  const getAllLeaveRequests = async () => {
    const leaves = await prisma.leave.findMany({
      include: {
        employee: {
          select: {
            name: true,
            workEmail: true,
            employeeNumber: true,
          },
        },
      },
      orderBy:{
        createdAt: 'desc'
      }
    });
    return leaves;
  };

  const removeLeaveRequest = async (leaveId: string) => {
    const leave = await prisma.leave.findUnique({
      where: {
        id: leaveId,
      },
    });
    if (!leave) {
      throw new Error('Leave request not found');
    }
    const deletedLeave = await prisma.leave.delete({
      where: {
        id: leaveId,
      },
    });
    return deletedLeave;
  };
  return { getAllLeaveRequests, removeLeaveRequest };
};

export default useLeaves;
