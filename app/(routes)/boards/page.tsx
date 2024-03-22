import useProject from '@/hooks/useProject';
import { Suspense } from 'react';
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

  if (!searchParams.projectId && projects.length > 0) {
    searchParams.projectId = projects[0].id;
  }

  return (
    <div className='px-2 md:px-4 h-full'>
      <Suspense fallback={<BoardList.Skeleton />}>
        <BoardList
          projectId={searchParams.projectId || ''}
          userProjects={projects}
        />
      </Suspense>
    </div>
  );
};

export default BoardsPage;
