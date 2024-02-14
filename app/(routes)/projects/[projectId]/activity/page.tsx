import { Suspense } from 'react';

import prisma from '@/lib/prisma';
import { ActivityList } from './_components/activity-list';
// import { checkSubscription } from '@/lib/subscription';

export const revalidate = 0;


interface ActivityPageProps {
  params: {
    projectId: string;
  };
}

const ActivityPage = async ({ params }: ActivityPageProps) => {
  // const isPro = await checkSubscription();

  const auditLogs = await prisma.auditLog.findMany({
    where: {
      projectId: params.projectId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className='w-full bg-white p-5 rounded-lg'>
      {/* <Info isPro={false} /> */}
      {/* <Separator className='my-2' /> */}
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList data={auditLogs} />
      </Suspense>
    </div>
  );
};

export default ActivityPage;
