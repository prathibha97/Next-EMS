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
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    accessorKey: 'username',
    header: 'Username',
    cell: ({ row }) => {
      return (
        <div className='w-full'>
          <div className='capitalize'>{row.getValue('username')}</div>
        </div>
      );
    },
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

      const [selectedRole, setSelectedRole] = useState(null);

      const handleViewEmployee = async () => {
        console.log(user.id);
      };

      const handleRoleSelect = (role: any) => {
        setSelectedRole(role);
      };

      const handleDelete = async () => {
        router.refresh();
      };

      useEffect(() => {
        // This effect will run whenever selectedRole changes
        console.log(selectedRole);
      }, [selectedRole]);

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
              <DropdownMenuItem>
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
                    <DropdownMenuItem onClick={() => handleRoleSelect('USER')}>
                      <span>USER</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleRoleSelect('MANAGER')}
                    >
                      <span>MANAGER</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRoleSelect('ADMIN')}>
                      <span>ADMIN</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem className='text-red-500'>
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
