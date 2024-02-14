import { Suspense } from "react";
import { BoardList } from "./_components/board-list";

interface BoardPageProps {
  params: {
    projectId: string;
  };
}

const BoardsPage = ({ params }: BoardPageProps) => {
  return (
    <div className='px-2 md:px-4 h-full'>
      <Suspense fallback={<BoardList.Skeleton />}>
        <BoardList projectId={params.projectId}/>
      </Suspense>
    </div>
  );
};
 
export default BoardsPage;