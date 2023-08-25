import { BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { NotificationCard } from '../cards/notification-card';

export function NotificationButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>
          <BellRing />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[410px]'>
        <NotificationCard />
      </PopoverContent>
    </Popover>
  );
}
