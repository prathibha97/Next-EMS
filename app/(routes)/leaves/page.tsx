'use client';
import { DataTable } from '@/components/data-table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { leaveBalanceData } from '@/constants/sample/leave-balance-data';
import { leaveData } from '@/constants/sample/leave-data';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { columns } from './components/columns';
import LeaveBalanceCard from './components/leave-balance-card';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/');
    },
  });

  return (
    <div>
      <div className='mb-5'>
        <Dialog>
          <DialogTrigger>
            <Button>Apply Leave</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 mb-5'>
        {leaveBalanceData.map((leaveBalance) => (
          <LeaveBalanceCard
            key={leaveBalance.id}
            balance={leaveBalance.balance}
            entitlement={leaveBalance.entitlement}
            leaveType={leaveBalance.leaveType}
          />
        ))}
      </div>
      <DataTable
        columns={columns}
        data={leaveData}
        placeholder='Date'
        searchFilter='requestDate'
      />
    </div>
  );
};

export default page;
