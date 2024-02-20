'use client';

import { toast } from 'sonner';
import { Copy, Trash } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';

import { CardWithList } from '@/types';
import { useAction } from '@/hooks/use-action';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useCardModal } from '@/hooks/use-card-modal';
import { copyCard } from '@/actions/copy-card';
import { deleteCard } from '@/actions/delete-card';
import { useSession } from 'next-auth/react';

interface ActionsProps {
  data: CardWithList;
}

export const Actions = ({ data }: ActionsProps) => {
  const params = useParams();
  const session = useSession();
  const cardModal = useCardModal();

  const searchParams = useSearchParams();
  const projectId = searchParams?.get('projectId') as string;

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" copied`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" deleted`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const onCopy = () => {
    const boardId = params?.boardId as string;

    executeCopyCard({
      id: data.id,
      boardId,
      projectId,
    });
  };

  const onDelete = () => {
    const boardId = params?.boardId as string;

    executeDeleteCard({
      id: data.id,
      boardId,
      projectId,
    });
  };

  if (session?.data?.user.role !== 'ADMIN') return;

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        onClick={onCopy}
        disabled={isLoadingCopy}
        variant="outline"
        className="w-full justify-start"
        size="inline"
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        variant="destructive"
        className="w-full justify-start"
        size="inline"
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
