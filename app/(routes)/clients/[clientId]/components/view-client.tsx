'use client';
import { useRemoveClientMutation } from '@/app/redux/services/clientApi';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Client } from '@prisma/client';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import EditClientDialog from './edit-client-dialog';

interface ViewClientProps {
  client: Client | null;
}

const ViewClient: FC<ViewClientProps> = ({ client }) => {
  const router = useRouter();
  const [removeClient, { isLoading: isRemoveClientLoading }] =
    useRemoveClientMutation();

  const handleRemoveClient = async (id: string) => {
    try {
      await removeClient(id);
      toast({
        title: 'Client removed successfully',
      });
      router.push('/clients');
      router.refresh();
    } catch (error) {
      console.log(error);
      return toast({
        title: 'Something went wrong!',
        description: 'Failed to remove client, please try again.',
        variant: 'destructive',
      });
    }
  };
  return (
    <div>
      <div className='flex space-x-3'>
        <EditClientDialog client={client} />
        <Button
          onClick={() => handleRemoveClient(client?.id || '')}
          variant='destructive'
          size='icon'
        >
          {isRemoveClientLoading && (
            <Icons.spinner className='mr-2 ml-2 h-5 w-5 animate-spin' />
          )}
          <Trash />
        </Button>
      </div>
      <div>
        <p>name: {client?.name}</p>
        <p>email: {client?.email}</p>
        <p>address: {client?.address}</p>
        <p>contact number: {client?.phone}</p>
      </div>
    </div>
  );
};

export default ViewClient;
