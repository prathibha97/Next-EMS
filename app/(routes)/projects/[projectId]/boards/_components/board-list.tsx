import FormPopover from '@/components/form/form-popover';
import { Skeleton } from '@/components/ui/skeleton';
import prisma from '@/lib/prisma';
// import { auth } from '@clerk/nextjs';
import { User2 } from 'lucide-react';
import Link from 'next/link';

interface BoardListProps {
  projectId: string;
}

export const BoardList = async ({ projectId }: BoardListProps) => {
  // const { orgId } = auth();

  // if (!orgId) {
  //   return redirect('/select-org');
  // }

  const boards = await prisma.board.findMany({
    where: {
      projectId: projectId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return (
    <div className='h-full md:space-y-4 bg-white md:w-full md:h-full p-5 rounded-lg'>
      <div className='flex items-center font-semibold text-md text-neutral-700'>
        <User2 className='h-6 w-6 mr-3' />
        Your Boards
      </div>
      <div className='flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 mt-3'>
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
        <FormPopover side='bottom' sideOffset={10}>
          <div
            role='button'
            className='aspect-video relative h-full w-full rounded-md flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition'
          >
            <p className='text-sm'>Create new board +</p>
            {/* <span className='text-xs'>5 remaining</span> */}
            {/* <Hint
              sideOffset={40}
              description={`Free Workspaces can have upto 5 open boards. For unlimited boards, upgrade this workspace`}
            >
              <HelpCircle className='absolute bottom-2 right-2 h-[14px] w-[14px]' />
            </Hint> */}
          </div>
        </FormPopover>
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
