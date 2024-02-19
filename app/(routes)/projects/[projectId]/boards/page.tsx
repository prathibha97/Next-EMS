import { Suspense } from "react";
import { BoardList } from "./_components/board-list";

interface ProjectBoardPageProps {
  params: {
    projectId: string;
  };
}

const ProjectBoardsPage = ({ params }: ProjectBoardPageProps) => {
  return (
    <div className='px-2 md:px-4 h-full'>
      <Suspense fallback={<BoardList.Skeleton />}>
        <BoardList projectId={params.projectId} />
      </Suspense>
    </div>
  );
};
 
export default ProjectBoardsPage;