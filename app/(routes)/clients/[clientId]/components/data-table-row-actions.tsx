'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  useRemoveTaskMutation,
  useUpdateTaskMutation,
} from '@/app/redux/services/taskApi';
import { toast } from '@/hooks/use-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { projectStatuses } from '../data/data';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const session = useSession();
  const router = useRouter();
  const project = row.original;
  // @ts-ignore
  const projectId = row.original.projectId;

  const [updateTask] = useUpdateTaskMutation();
  const [removeTask] = useRemoveTaskMutation();

  const handleUpdateStatus = async (status: any) => {
    try {
      await updateTask({
        projectId: project.id,
        body: {
          status: status.value,
          projectId: projectId,
        },
      }).unwrap();
      toast({
        title: `Task status updated as ${status.label}`,
      });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Something went wrong!',
        description: `Failed to update project status. Please try again.`,
        variant: 'destructive',
      });
    }
  };

  const handleRemoveTask = async (projectId: string) => {
    try {
      await removeTask(projectId).unwrap();
      toast({
        title: `Task removed successfully`,
      });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Something went wrong!',
        description: `Failed to remove project status. Please try again.`,
        variant: 'destructive',
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        {session.data?.user.role === 'ADMIN' && (
          <>
            <DropdownMenuItem
              onClick={() => router.push(`/projects/${project.id}`)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={project.status}>
              {projectStatuses.map((status) => (
                <DropdownMenuRadioItem
                  key={status.value}
                  value={status.value}
                  onClick={() => handleUpdateStatus(status)}
                >
                  <div className='flex'>
                    {status.icon && (
                      <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
                    )}
                    {status.label}
                  </div>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        {/* {session.data?.user.role === 'ADMIN' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleRemoveTask(project.id as string)}>
              Delete
            </DropdownMenuItem>
          </>
        )} */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
