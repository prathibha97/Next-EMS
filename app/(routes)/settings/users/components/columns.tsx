'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  Clipboard,
  MoreHorizontal,
  Trash,
  UserPlus,
  View,
} from 'lucide-react';

import { useRemoveUserMutation, useUpdateUserMutation } from '@/app/redux/services/userApi';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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

      const handleViewEmployee = async (employeeId: string) => {
        router.push(`/organization/employees/${employeeId}`);
      };

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

      const handleDeleteUser = async (userId:string) => {
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
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(user.id);
                }}
              >
                <Clipboard className='mr-2 h-4 w-4' />
                <span>Copy user ID</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleViewEmployee(user.id)}>
                <View className='mr-2 h-4 w-4' />
                <span>View Employee</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
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
