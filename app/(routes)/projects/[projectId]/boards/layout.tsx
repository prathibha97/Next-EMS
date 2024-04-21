import { BoardSidebar } from '@/components/board-sidebar';
import useProject from '@/hooks/useProject';

const BoardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { getCurrentEmployeeProjects } = useProject();
  const projects = await getCurrentEmployeeProjects();
  return (
    <main className='w-full mx-auto'>
      <div className='flex flex-col gap-3 md:flex-row'>
        <div className='w-full md:w-64 shrink-0'>
          <BoardSidebar projects={projects} />
        </div>
        {children}
      </div>
    </main>
  );
};

export default BoardLayout;
