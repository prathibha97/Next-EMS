import { Suspense } from 'react';
import useProject from '@/hooks/useProject';
import { BoardList } from './_components/board-list';

interface BoardPageProps {
  params: {
    projectId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const BoardsPage = async ({ searchParams }: BoardPageProps) => {
  const { getProjectBoards } = useProject();
  const projects = await getProjectBoards();

  return (
    <div className='px-2 md:px-4 h-full'>
      <Suspense fallback={<BoardList.Skeleton />}>
        <BoardList
          projectId={searchParams.projectId || projects[0].id}
          userProjects={projects}
        />
      </Suspense>
    </div>
  );
};

export default BoardsPage;
