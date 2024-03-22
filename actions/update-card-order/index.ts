

'use server';

import { createSafeAction } from '@/lib/create-safe-action';
import prisma from '@/lib/prisma';
import { Card, TaskStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { UpdateCardOrder } from './schema';
import { InputType, ReturnType } from './types';
import { updateProjectProgress } from '@/lib/updateProjectProgress';


const handler = async (data: InputType): Promise<ReturnType> => {
  const { items, boardId } = data;
  let updatedCards: Card[];

  try {
    // Start a transaction to update cards and tasks
    const transaction = items.map((card) => {
      return prisma.$transaction(async (prisma) => {
        // Update the card's order and listId
        const updatedCard = await prisma.card.update({
          where: { id: card.id },
          data: { order: card.order, listId: card.listId },
          include: { list: true },
        });

        let newStatus: TaskStatus | null;
        // Determine the new status based on the list's title
        switch (updatedCard.list.title) {
          case 'TODO':
            newStatus = 'Todo';
            break;
          case 'IN PROGRESS':
            newStatus = 'In_Progress';
            break;
          case 'DONE':
            newStatus = 'Done';
            break;
          default:
            newStatus = 'Todo'; // Default status if list title is unrecognized
        }

        // If newStatus is determined and taskId is available, update the task's status
        if (newStatus && updatedCard.taskId) {
          await prisma.task.update({
            where: {
              id: updatedCard.taskId,
              projectId: updatedCard.projectId!,
            },
            data: { status: newStatus },
          });
        }

        return updatedCard;
      });
    });

    // Execute all the transactions
    updatedCards = await Promise.all(transaction);

    // After all card updates are complete, update project progress
    await updateProjectProgress(updatedCards[0].projectId!);
  } catch (error: any) {
    console.log(error.message);
    return {
      error: 'Failed to reorder.',
    };
  }

  // Revalidate the cache path for the board
  revalidatePath(`/boards/${boardId}`);
  return { data: updatedCards };
};





export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
