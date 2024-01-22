'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useRemoveEmployeeMutation } from '@/app/redux/services/employeeApi';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();

  const [removeEmployee] = useRemoveEmployeeMutation();

  const handleRemoveEmployee = async (employeeId: string) => {
    try {
      await removeEmployee(employeeId).unwrap();
      toast({
        title: `Task removed successfully`,
      });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Something went wrong!',
        description: `Failed to remove task status. Please try again.`,
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
        <DropdownMenuItem
          onClick={() =>
            router.push(`/organization/employees/${row.original.id}/edit`)
          }
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleRemoveEmployee(row.original.id)}
          className='text-red-500'
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
