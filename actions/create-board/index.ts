'use server';

import { createSafeAction } from '@/lib/create-safe-action';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { CreateBoard } from './schema';
import { InputType, ReturnType } from './types';
import { createAuditLog } from '@/lib/create-audit-log';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import { getAuthSession } from '@/app/api/auth/[...nextauth]/options';

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getAuthSession();

  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  const { title, image,projectId} = data;

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split('|');

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageUserName ||
    !imageLinkHTML
  ) {
    return {
      error: 'Missing fields. Failed to create board.',
    };
  }

  let board;

  try {
    board = await prisma.board.create({
      data: {
        title,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
        projectId
      },
    });
    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
      projectId
    });
  } catch (error) {
    return {
      error: 'Failed to create',
    };
  }

  revalidatePath(`/boards/${board.id}`);
  return {
    data: board,
  };
};

export const createBoard = createSafeAction(CreateBoard, handler);
