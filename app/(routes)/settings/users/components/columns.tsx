'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Trash, UserPlus } from 'lucide-react';

import {
  useRemoveUserMutation,
  useUpdateUserMutation,
} from '@/app/redux/services/userApi';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';
import { User, UserRole } from '@prisma/client';
import { useRouter } from 'next/navigation';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'role',
    header: () => <div>Role</div>,
    cell: ({ row }) => <div>{row.getValue('role')}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const router = useRouter();
      const user = row.original;

      const [updateTask] = useUpdateUserMutation();
      const [removeUser] = useRemoveUserMutation();

      const handleUpdateUserRole = async (role: UserRole) => {
        try {
          if (!role) {
            toast({
              title: 'Please select a role',
            });
            return;
          }

          await updateTask({
            userId: user.id,
            body: {
              role: role,
            },
          }).unwrap();

          toast({
            title: `User role updated successfully`,
          });

          router.refresh();
        } catch (error) {
          toast({
            title: 'Something went wrong!',
            description: `Failed to update user role. Please try again.`,
            variant: 'destructive',
          });
        }
      };

      const handleDeleteUser = async (userId: string) => {
        try {
          await removeUser(userId).unwrap();
          toast({
            title: `User removed successfully`,
          });
          router.refresh();
        } catch (error) {
          toast({
            title: 'Something went wrong!',
            description: `Failed to remove user. Please try again.`,
            variant: 'destructive',
          });
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreHorizontal className='hover:cursor-pointer' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>Manage Users</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus className='mr-2 h-4 w-4' />
                  <span>Update User Role</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      onClick={() => handleUpdateUserRole('USER')}
                    >
                      <span>USER</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        handleUpdateUserRole('MANAGER');
                      }}
                    >
                      <span>MANAGER</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleUpdateUserRole('ADMIN')}
                    >
                      <span>ADMIN</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem
                className='text-red-500'
                onClick={() => handleDeleteUser(user.id)}
              >
                <Trash className='mr-2 h-4 w-4' />
                <span>Remove User</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
