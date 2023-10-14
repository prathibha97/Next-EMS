import { Progress } from '@/components/ui/progress';
import { FC } from 'react'

interface LeaveBalanceCardProps {
  leaveType: string
  entitlement: number;
  balance: number;
}

const LeaveBalanceCard: FC<LeaveBalanceCardProps> = ({balance,entitlement,leaveType}) => {
  const usedPercentage = (balance / entitlement) * 100;
  return (
    <div className='bg-white dark:bg-black/60 drop-shadow-lg rounded-md'>
      <div className='p-2 pt-4 px-10 text-center'>{leaveType}</div>

      <div className='p-2 text-2xl font-bold text-center'>
        {balance}/{entitlement}
      </div>
      <div className='p-4'>
        <Progress value={usedPercentage} />
      </div>
    </div>
  );
}

export default LeaveBalanceCard