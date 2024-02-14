import { BoardSidebar } from "@/components/board-sidebar";
import useProject from "@/hooks/useProject";

const BoardLayout = async({ children }: { children: React.ReactNode }) => {
  const {getCurrentEmployeeProjects} = useProject()
  const projects = await getCurrentEmployeeProjects();
  return (
    <main className='pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto'>
      <div className='flex gap-x-7'>
        <div className='w-64 shrink-0 hidden md:block'>
          <BoardSidebar projects={projects} />
        </div>
        {children}
      </div>
    </main>
  );
};

export default BoardLayout;
