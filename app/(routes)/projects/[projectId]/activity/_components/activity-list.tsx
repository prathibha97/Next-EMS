import { redirect } from 'next/navigation';

import { ActivityItem } from '@/components/activity-item';
import { Skeleton } from '@/components/ui/skeleton';
import { AuditLog } from '@prisma/client';

interface ActivityListProps {
  data: AuditLog[]
}

export const ActivityList = async ({data}: ActivityListProps) => {
  return (
    <ol className='space-y-4 mt-4'>
      <p className='hidden last:block text-xs text-center text-muted-foreground'>
        No activity found inside this project
      </p>
      {data.map((log) => (
        <ActivityItem key={log.id} data={log} />
      ))}
    </ol>
  );
};

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className='space-y-4 mt-4'>
      <Skeleton className='w-[80%] h-14' />
      <Skeleton className='w-[50%] h-14' />
      <Skeleton className='w-[70%] h-14' />
      <Skeleton className='w-[80%] h-14' />
      <Skeleton className='w-[75%] h-14' />
    </ol>
  );
};
