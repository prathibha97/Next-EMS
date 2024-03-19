'use client';
import { setLogout } from '@/app/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getInitials } from '@/lib/utils';
import { Employee } from '@prisma/client';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function UserNav() {
  const router = useRouter();
  const session = useSession()
  const dispatch = useAppDispatch();
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const getCurrentEmployee = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/employees/me`
        );
        setEmployee(data);
        // dispatch(setCurrentEmployee(data));
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    getCurrentEmployee();
  }, []);


  // const employee = useAppSelector((state) => state.employee.currentEmployee);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='relative h-12 w-12 rounded-full'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src={employee?.profile_photo} alt='avatar' />
              <AvatarFallback>{getInitials(employee?.name!)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium leading-none'>
                {employee?.name}
              </p>
              <p className='text-xs leading-none text-muted-foreground'>
                {employee?.workEmail}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push('/profile')}>
              Profile
            </DropdownMenuItem>
            {session.data?.user.role === 'ADMIN' && (
              <DropdownMenuItem onClick={() => router.push('/settings')}>
                Settings
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              // dispatch(clearCurrentEmployee());
              signOut();
              dispatch(setLogout());
              router.push('/');
            }}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
