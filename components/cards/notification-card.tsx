'use client'
import { BellRing, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react';
import { pusherClient } from '@/lib/pusher';

const notifications = [
  {
    title: 'Your call has been confirmed.',
    description: '1 hour ago',
  },
  {
    title: 'You have a new message!',
    description: '1 hour ago',
  },
  {
    title: 'Your subscription is expiring soon!',
    description: '2 hours ago',
  },
];

type CardProps = React.ComponentProps<typeof Card>;
type Notification = {
  title: string;
  description: string;
}

export function NotificationCard({ className, ...props }: CardProps) {


  return (
    <Card className={cn('w-fit', className)} {...props}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          You have {notifications.length} unread messages.
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <div className='flex items-center space-x-4 rounded-md border p-4'>
          <BellRing />
          <div className='flex-1 space-y-1'>
            <p className='text-sm font-medium leading-none'>
              Push Notifications
            </p>
            <p className='text-sm text-muted-foreground'>
              Send notifications to device.
            </p>
          </div>
          <Switch />
        </div>
        {notifications.map((notification, index) => (
          <div
            key={index}
            className='flex items-start space-x-4 pb-4 last:pb-0'
          >
            <span className='w-2 h-2 bg-sky-500 rounded-full' />
            <div className='flex-1 space-y-1'>
              <p className='text-sm font-medium leading-none'>
                {notification.title}
              </p>
              <p className='text-sm text-muted-foreground'>
                {notification.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>

      <CardFooter>
        <Button className='w-full'>
          <Check className='h-4 w-4 mr-2' /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
}
