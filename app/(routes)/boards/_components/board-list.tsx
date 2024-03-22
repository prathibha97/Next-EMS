import { getAuthSession } from '@/app/api/auth/[...nextauth]/options';
import FormPopover from '@/components/form/form-popover';
import { Skeleton } from '@/components/ui/skeleton';
import prisma from '@/lib/prisma';
import { Project } from '@prisma/client';
import { User2 } from 'lucide-react';
import Link from 'next/link';
import { ProjectSelector } from './project-selector';

interface BoardListProps {
  projectId: string | string[];
  userProjects: Project[];
}

export const BoardList = async ({
  projectId,
  userProjects,
}: BoardListProps) => {
  const session = await getAuthSession();

  if (!projectId) {
    return (
      <div className='w-full h-full m-auto flex items-center justify-center text-gray-500'>
        No projects have been assigned yet.
      </div>
    );
  }

  const boards = await prisma.board.findMany({
    where: {
      projectId: projectId as string,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (boards.length === 0) {
    return <div className='text-center'>No boards available.</div>;
  }

  return (
    <div className='h-full space-y-4 bg-white p-5 rounded-lg'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center font-semibold text-lg text-neutral-700'>
          <User2 className='h-6 w-6 mr-2' />
          Your Boards
        </div>
        <ProjectSelector projects={userProjects} />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/boards/${board.id}?projectId=${projectId}`}
            className='group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-md h-full w-full p-2 overflow-hidden'
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className='absolute inset-0 bg-black/30 group-hover:bg-black/40 transition' />
            <p className='relative font-semibold text-white'>{board.title}</p>
          </Link>
        ))}
        {session?.user.role === 'ADMIN' && (
          <FormPopover side='bottom' sideOffset={10}>
            <div
              role='button'
              className='aspect-video relative h-full w-full rounded-md flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition'
            >
              <p className='text-sm'>Create new board</p>
            </div>
          </FormPopover>
        )}
      </div>
    </div>
  );
};

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className='grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
    </div>
  );
};
