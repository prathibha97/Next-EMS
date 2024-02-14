'use server';

import { createSafeAction } from '@/lib/create-safe-action';
import prisma from '@/lib/prisma';

import { revalidatePath } from 'next/cache';
import { CopyList } from './schema';
import { InputType, ReturnType } from './types';
import { createAuditLog } from '@/lib/create-audit-log';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

const handler = async (data: InputType): Promise<ReturnType> => {
  // const { userId, orgId } = auth();

  // if (!userId || !orgId) {
  //   return {
  //     error: 'Unauthorized',
  //   };
  // }

  const { id, boardId,projectId } = data;
  let list;

  try {
    const listToCopy = await prisma.list.findUnique({
      where: {
        id,
        boardId,
        // board: {
        //   orgId,
        // },
      },
      include: {
        cards: true,
      },
    });

    if (!listToCopy) {
      return {
        error: 'List not found!',
      };
    }

    const lastList = await prisma.list.findFirst({
      where: {
        boardId,
      },
      orderBy: {
        order: 'desc',
      },
      select: {
        order: true,
      },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await prisma.list.create({
      data: {
        boardId: listToCopy.boardId,
        title: `${listToCopy.title} - Copy`,
        order: newOrder,
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
      include: {
        cards: true,
      },
    });
    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE,
      projectId,
    });
  } catch {
    return {
      error: 'Failed to copy.',
    };
  }
  revalidatePath(`/boards/${boardId}`);
  return {
    data: list,
  };
};

export const copyList = createSafeAction(CopyList, handler);
