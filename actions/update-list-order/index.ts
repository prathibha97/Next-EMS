'use server';

import prisma from '@/lib/prisma';

// import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { InputType, ReturnType } from './types';
import { createSafeAction } from '@/lib/create-safe-action';
import { UpdateListOrder } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
  // const { userId, orgId } = auth();

  // if (!userId || !orgId) {
  //   return {
  //     error: 'Unauthorized',
  //   };
  // }

  const { items, boardId } = data;
  let lists;

  try {
    const transaction = items.map((list) =>
      prisma.list.update({
        where: {
          id: list.id,
          // board: {
          //   orgId,
          // },
        },
        data: {
          order: list.order,
        },
      })
    );

    lists = await prisma.$transaction(transaction);
  } catch {
    return {
      error: 'Failed to reorder.',
    };
  }
  revalidatePath(`/boards/${boardId}`);
  return { data: lists };
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);