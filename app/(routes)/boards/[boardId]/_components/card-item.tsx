'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCardModal } from '@/hooks/use-card-modal';
import { getInitials } from '@/lib/utils';
import { Draggable } from '@hello-pangea/dnd';
import { Card } from '@prisma/client';
import { FC } from 'react';

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem: FC<CardItemProps> = ({ data, index }) => {
  const cardModal = useCardModal();

  
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role='button'
          onClick={() => cardModal.onOpen(data.id)}
          className='flex justify-between items-center truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm'
        >
          {data.title}
          <Avatar>
            <AvatarImage src={data.task.employee.profile_photo} alt='@avatar' />
            <AvatarFallback>
              {getInitials(data.task.employee.name)}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </Draggable>
  );
};
