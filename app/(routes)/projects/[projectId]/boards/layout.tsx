import { BoardSidebar } from '@/components/board-sidebar';
import useProject from '@/hooks/useProject';

const BoardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { getCurrentEmployeeProjects } = useProject();
  const projects = await getCurrentEmployeeProjects();
  return (
    <main className="2xl:max-w-screen-xl mx-auto">
      <div className="flex">
        <div className="w-64 shrink-0 hidden md:block">
          <BoardSidebar projects={projects} />
        </div>
        {children}
      </div>
    </main>
  );
};

export default BoardLayout;
