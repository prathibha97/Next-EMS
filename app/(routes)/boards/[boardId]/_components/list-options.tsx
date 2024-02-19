import { ElementRef, FC, useRef } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from '@/components/ui/popover';
import { List } from '@prisma/client';
import { FormSubmit } from '@/components/form/form-submit';
import { Separator } from '@/components/ui/separator';
import { useAction } from '@/hooks/use-action';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, X } from 'lucide-react';
import { deleteList } from '@/actions/delete-list';
import { toast } from 'sonner';
import { copyList } from '@/actions/copy-list';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export const ListOptions: FC<ListOptionsProps> = ({ data, onAddCard }) => {
  const session = useSession()
  const closeRef = useRef<ElementRef<'button'>>(null);

  const searchParams = useSearchParams();
  const projectId = searchParams?.get('projectId') as string;

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" copied`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;

    executeDelete({ id, boardId, projectId });
  };

  const onCopy = (formData: FormData) => {
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;

    executeCopy({ id, boardId, projectId });
  };

  if (session?.data?.user.role !== 'ADMIN') return;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='h-auto w-auto p-2' variant='ghost'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='px-0 pt-3 pb-3' side='bottom' align='start'>
        <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
          List actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
            variant='ghost'
          >
            <X className='h-4 w-4' />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
          variant='ghost'
        >
          Add card...
        </Button>
        <form action={onCopy}>
          <input hidden name='id' id='id' value={data.id} />
          <input hidden name='boardId' id='boardId' value={data.boardId} />
          <FormSubmit
            variant='ghost'
            className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
          >
            Copy list...
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden name='id' id='id' value={data.id} />
          <input hidden name='boardId' id='boardId' value={data.boardId} />
          <FormSubmit
            variant='ghost'
            className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
          >
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
