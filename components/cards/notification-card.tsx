'use client';
import {
  useClearNotificationsMutation,
  useMarkAllAsReadMutation,
} from '@/app/redux/services/notificationApi';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Employee, Notification } from '@prisma/client';
import { formatDistance } from 'date-fns';
import { BellRing, Check, Loader2 } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import ActionButton from '../buttons/action-button';
import { ScrollArea } from '../ui/scroll-area';

interface NotificationCardProps {
  notifications: Notification[];
  employee: Employee;
  className?: string;
  unreadCount: number;
  setNotifications: Dispatch<SetStateAction<Notification[]>>;
}

export function NotificationCard({
  className,
  notifications,
  employee,
  unreadCount,
  setNotifications,
  ...props
}: NotificationCardProps) {
  const employeeId = employee.id;
  const [markAllAsRead, { isLoading: isMarkAsReadLoading }] =
    useMarkAllAsReadMutation();
  const [clearNotifications, { isLoading: isClearNotificationsLoading }] =
    useClearNotificationsMutation();
  const hanldeMarkAsRead = async () => {
    await markAllAsRead({ employeeId });
    setNotifications((prevNotifications) => {
      return prevNotifications.map((notification) => {
        return { ...notification, isRead: true };
      });
    });
  };

  const hanldeClearNotifications = async () => {
    await clearNotifications({ employeeId });
    setNotifications([]);
  };

  return (
    <Card className={cn('w-full', className)} {...props}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          You have {unreadCount} unread messages.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* <div className='flex items-center space-x-4 rounded-md border p-4'>
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
        </div> */}
        <ScrollArea>
          {notifications?.map((notification) => (
            <div
              className="flex items-start bg-gray-100 dark:bg-gray-800/30 rounded-md p-2 space-x-4 pb-2 last:pb-1 mt-2 first:mt-0"
              key={notification.id}
            >
              {notification.isRead === false && (
                <span className="w-2 h-2 bg-sky-500 rounded-full" />
              )}
              <div className="flex-1 space-y-1">
                <p
                  className={cn(
                    'text-sm font-medium leading-none',
                    notification?.isRead === true && 'font-light'
                  )}
                >
                  {notification?.message}
                </p>
                {notification?.createdAt && (
                  <p className="text-sm text-muted-foreground">
                    {formatDistance(
                      new Date(notification?.createdAt),
                      new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
                  </p>
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>

      <CardFooter>
        {unreadCount > 0 && (
          <ActionButton
            className="w-full"
            onClick={hanldeMarkAsRead}
            label=" Mark all as read"
            isLoading={isMarkAsReadLoading}
          />
        )}

        {unreadCount === 0 && notifications.length > 0 && (
          <Button className="w-full" onClick={hanldeClearNotifications}>
            {isClearNotificationsLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Check className="h-4 w-4 mr-2" />
            )}
            Clear notifications
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
