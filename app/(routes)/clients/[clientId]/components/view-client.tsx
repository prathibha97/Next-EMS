'use client';
import { FC } from 'react';
import { Trash } from 'lucide-react';
import { useRemoveClientMutation } from '@/app/redux/services/clientApi';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import EditClientDialog from './edit-client-dialog';
import { DataTable } from '@/app/(routes)/projects/components/data-table';
import { columns } from './columns';
import { useRouter } from 'next/navigation';
import { Client } from '@prisma/client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

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
    <div className="bg-white dark:bg-black/60 p-8 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
        <h2 className="text-2xl font-bold">Client Details</h2>
        <div className="flex space-x-3 mt-4">
          <EditClientDialog client={client} />
          {/* <Button
            onClick={() => handleRemoveClient(client?.id || '')}
            variant='destructive'
            size='icon'
          >
            {isRemoveClientLoading && (
              <div className='animate-spin'>
                <div className='spinner' />
              </div>
            )}
            <Trash />
          </Button> */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                // onClick={() => handleRemoveProject(project?.id || '')}
                variant="destructive"
                size="icon"
              >
                {isRemoveClientLoading && (
                  <div className="animate-spin">
                    <div className="spinner" />
                  </div>
                )}
                <Trash />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this client and all data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleRemoveClient(client?.id || '')}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-bold">Name:</p>
          <p>{client?.name}</p>
        </div>
        <div>
          <p className="font-bold">Email:</p>
          <p>{client?.email}</p>
        </div>
        <div>
          <p className="font-bold">Address:</p>
          <p>{client?.address}</p>
        </div>
        <div>
          <p className="font-bold">Contact Number:</p>
          <p>{client?.phone}</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4">Projects</h3>
        <div className="border rounded-md p-3">
          {/* @ts-ignore */}
          <DataTable data={client?.projects} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default ViewClient;
