'use server';

import prisma from '@/lib/prisma';

// import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { InputType, ReturnType } from './types';
import { createSafeAction } from '@/lib/create-safe-action';
import { UpdateBoard } from './schema';
import { createAuditLog } from '@/lib/create-audit-log';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

const handler = async (data: InputType): Promise<ReturnType> => {
  // const { userId, orgId } = auth();

  // if (!userId || !orgId) {
  //   return {
  //     error: 'Unauthorized',
  //   };
  // }

  const { title, id,projectId } = data;
  let board;

  try {
    board = await prisma.board.update({
      where: {
        id,
        // orgId,
      },
      data: {
        title,
      },
    });
    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.UPDATE,
      projectId,
    });
  } catch {
    return {
      error: 'Failed to update.',
    };
  }
  revalidatePath(`/boards/${id}`);
  return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);