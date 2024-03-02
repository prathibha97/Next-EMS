import prisma from '@/lib/prisma';
import ViewTimeSheet from './components/view-time-sheet';

const TimeSheetAdminPage = async () => {
  const taskWork = await prisma.taskWork.findMany({
    include: {
      task: {
        include: {
          project: {
            select: {
              name: true,
              client: true,
            },
          },
        },
      },
      employee: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div>
      <ViewTimeSheet taskWork={taskWork} />
    </div>
  );
};

export default TimeSheetAdminPage;
