'use client';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useCurrentEmployee } from '@/hooks/useCurrentEmployee';
import { fetcher } from '@/lib/fetcher';
import { pusherClient } from '@/lib/pusher';
import { Notification } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { BellRing } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NotificationCard } from '../cards/notification-card';

export function NotificationButton() {
  const [isMounted, setIsMounted] = useState(false);
  const { employee, loading, error } = useCurrentEmployee();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const { data: notificationData } = useQuery<Notification[]>({
    queryKey: ['notifications', employee?.id],
    queryFn: () => fetcher(`/api/notifications/employee/${employee?.id}`),
    enabled: !!employee?.id,
    refetchInterval: 10000, // Poll for new notifications every 10 seconds
  });

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (notificationData) {
      setNotifications(notificationData);
    }
  }, [notificationData]);

  useEffect(() => {
    if (employee && employee.id) {
      const channel = pusherClient.subscribe(employee.id);

      const handleNewNotification = (data: Notification) => {
        setNotifications((prevNotifications) => [...prevNotifications, data]);
      };

      const handleSubscriptionError = (status: any) => {
        console.error('Pusher subscription error:', status);

        if (status.error?.data?.code === 4201) {
          console.error('Pusher connection limit exceeded.');
        }
      };

      channel.bind('notifications:new', handleNewNotification);
      channel.bind('pusher:subscription_error', handleSubscriptionError);

      return () => {
        channel.unbind('notifications:new', handleNewNotification);
        channel.unbind('pusher:subscription_error', handleSubscriptionError);
        pusherClient.unsubscribe(employee.id);
        pusherClient.disconnect();
      };
    }
  }, [employee]);

  const unreadCount = notifications?.filter(
    (notification) => !notification.isRead
  ).length;

  if (!employee || !isMounted) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='relative'>
          <BellRing />
          {unreadCount > 0 && (
            <span className='animate-ping absolute h-3 w-3 top-0 right-0 rounded-full bg-sky-400 opacity-75'></span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[370px] md:w-[410px]'>
        <NotificationCard
          notifications={notifications}
          employee={employee}
          unreadCount={unreadCount}
          setNotifications={setNotifications}
        />
      </PopoverContent>
    </Popover>
  );
}
