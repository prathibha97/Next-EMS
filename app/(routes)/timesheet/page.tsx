import useEmployee from '@/hooks/useEmployee';
import prisma from '@/lib/prisma';
import ViewTimeSheet from './components/view-time-sheet';

const TimeSheetPage = async () => {
  const { getLoggedInEmployee } = useEmployee();
  const employee = await getLoggedInEmployee();
  const taskWork = await prisma.taskWork.findMany({
    where: {
      employeeId: employee?.id,
    },
    include: {
      task: {
        include: {
          project: {
            select:{
              name: true,
              client:true
            }
          }
        },
      },
      employee:{
        select:{
          name:true
        }
      }
    },
  });

  return (
    <div>
      <ViewTimeSheet taskWork={taskWork} employeeId={employee?.id!} />
    </div>
  );
};

export default TimeSheetPage;
