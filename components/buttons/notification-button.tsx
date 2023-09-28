'use client'
import { BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { NotificationCard } from '../cards/notification-card';
import { useEffect, useState } from 'react';
import { Employee, Notification } from '@prisma/client';
import axios from 'axios';
import { pusherClient } from '@/lib/pusher';

export function NotificationButton() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    // @ts-ignore
    const [employee, setEmployee] = useState<Employee>({});

    useEffect(() => {
      const getCurrentEmployee = async () => {
        try {
          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_URL}/employees/me`
          );
          setEmployee(data);
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

        return () => {
          pusherClient.unsubscribe(employee.id);
        };
      }
    }, [employee]);
    
    const unreadCount = notifications?.filter(
      (notification) => !notification.isRead
    ).length;


    if (!employee) {
      return <div>Loading...</div>;
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
