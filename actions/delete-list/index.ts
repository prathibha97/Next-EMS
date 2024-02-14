'use server';

import { createSafeAction } from '@/lib/create-safe-action';
import prisma from '@/lib/prisma';

// import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { DeleteList } from './schema';
import { InputType, ReturnType } from './types';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import { createAuditLog } from '@/lib/create-audit-log';

const handler = async (data: InputType): Promise<ReturnType> => {
  // const { userId, orgId } = auth();

  // if (!userId || !orgId) {
  //   return {
  //     error: 'Unauthorized',
  //   };
  // }

  const { id, boardId ,projectId} = data;
  let list;

  try {
    list = await prisma.list.delete({
      where: {
        id,
        boardId,
        // board: {
        //   orgId,
        // },
      },
    });
    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.DELETE,
      projectId,
    });
  } catch {
    return {
      error: 'Failed to delete.',
    };
  }
  revalidatePath(`/boards/${boardId}`);
  return {
    data: list,
  };
};

export const deleteList = createSafeAction(DeleteList, handler);
