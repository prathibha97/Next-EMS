'use client';
import { useAppDispatch } from '@/app/redux/hooks';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { pusherClient } from '@/lib/pusher';
import { Employee, Notification } from '@prisma/client';
import axios from 'axios';
import { BellRing } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NotificationCard } from '../cards/notification-card';

export function NotificationButton() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

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

  useEffect(() => {
    const getEmployeeNotifications = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/notifications/employee/${employee?.id}`
        );
        setNotifications(data);
        router.refresh();
      } catch (error) {
        console.error('Error fetching employee notification data:', error);
      }
    };
    if (employee?.id) {
      getEmployeeNotifications();
    }
  }, [employee]);

  useEffect(() => {
    if (employee && employee.id) {
      const channel = pusherClient.subscribe(employee.id);

      channel.bind('notifications:new', (data: Notification) => {
        setNotifications((prevNotifications) => [...prevNotifications, data]);
      });

      channel.bind('pusher:subscription_error', (status: any) => {
        console.error('Pusher subscription error:', status);

        if (status.error.data.code === 4201) {
          console.error('Pusher connection limit exceeded.');
        }
      });

      return () => {
        pusherClient.unsubscribe(employee.id);
        pusherClient.disconnect();
      };
    }
  }, []);

  const unreadCount = notifications?.filter(
    (notification) => !notification.isRead
  ).length;

  if (!employee) {
    return <div>Loading...</div>;
  }

  if (!isMounted) {
    return null;
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
      <PopoverContent className='w-[410px]'>
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
