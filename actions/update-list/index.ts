'use server';

import prisma from '@/lib/prisma';

// import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { InputType, ReturnType } from './types';
import { createSafeAction } from '@/lib/create-safe-action';
import { UpdateList } from './schema';
import { createAuditLog } from '@/lib/create-audit-log';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

const handler = async (data: InputType): Promise<ReturnType> => {
  // const { userId, orgId } = auth();

  // if (!userId || !orgId) {
  //   return {
  //     error: 'Unauthorized',
  //   };
  // }

  const { title, id , boardId,projectId} = data;
  let list;

  try {
    list = await prisma.list.update({
      where: {
        id,
        boardId,
        // board:{
        //   orgId
        // }
      },
      data: {
        title,
      },
    });
    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE,
      projectId,
    });
  } catch {
    return {
      error: 'Failed to update.',
    };
  }
  revalidatePath(`/boards/${boardId}`);
  return { data: list };
};

export const updateList = createSafeAction(UpdateList, handler);