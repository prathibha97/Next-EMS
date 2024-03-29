'use server';

import { createSafeAction } from '@/lib/create-safe-action';
import prisma from '@/lib/prisma';

// import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { DeleteBoard } from './schema';
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

  const { id ,projectId} = data;
  let board;

  try {
    board = await prisma.board.delete({
      where: {
        id,
        // orgId,
      },
    });
    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.DELETE,
      projectId,
    });
  } catch {
    return {
      error: 'Failed to delete.',
    };
  }
  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);
