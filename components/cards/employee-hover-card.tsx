import { CalendarDays } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { FC } from 'react';
import { Employee } from '@prisma/client';
import { format } from 'util';
import { formatDateString } from '@/lib/utils';

interface HoverCardProps {
  employee: Employee;
}

export const EmployeeHoverCard:FC<HoverCardProps> =({employee})=> {

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant='link'>{employee.name}</Button>
      </HoverCardTrigger>
      <HoverCardContent className='w-80'>
        <div className='flex items-center justify-between space-x-4'>
          <Avatar>
            <AvatarImage src={employee.profile_photo} className='object-cover'/>
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className='space-y-1'>
            <h4 className='text-sm font-semibold'>@{employee.name}</h4>
            <p className='text-sm'>{employee.workEmail}</p>
            <div className='flex items-center pt-2'>
              <CalendarDays className='mr-2 h-4 w-4 opacity-70' />{' '}
              <span className='text-xs text-muted-foreground'>
                Joined on {formatDateString(employee.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
