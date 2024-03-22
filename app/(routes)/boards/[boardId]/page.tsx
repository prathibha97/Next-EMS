import prisma from '@/lib/prisma';
import { ListContainer } from './_components/list-container';

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}
const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const lists = await prisma.list.findMany({
    where: {
      boardId: params.boardId,
    },
    include: {
      cards: {
        include: {
          task: {
            include: {
              employee: true,
            },
          },
        },
        orderBy: {
          order: 'asc',
        },
      },
    },
    orderBy: {
      order: 'asc',
    },
  });

  return (
    <div className='p-4 overflow-x-auto h-full'>
      <ListContainer boardId={params.boardId} data={lists} />
    </div>
  );
};

export default BoardIdPage;
