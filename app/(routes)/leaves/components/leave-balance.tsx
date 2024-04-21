import { Employee, LeaveBalance } from '@prisma/client';
import { FC } from 'react';
import LeaveBalanceCard from './leave-balance-card';

interface LeaveBalanceProps {
  currentEmployee: Employee & {
    leaveBalance: LeaveBalance;
  };
}

const LeaveBalance: FC<LeaveBalanceProps> = ({ currentEmployee }) => {
  if (!currentEmployee) {
    return null;
  }


  return (
    <div className='grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 mb-5'>
      {currentEmployee?.leaveBalance?.annual >= 1 && (
        <LeaveBalanceCard
          balance={currentEmployee?.leaveBalance?.annual}
          entitlement={currentEmployee?.leaveBalance?.annualEntitlement}
          leaveType='Annual'
        />
      )}
      <LeaveBalanceCard
        balance={currentEmployee?.leaveBalance?.casual}
        entitlement={currentEmployee?.leaveBalance?.casualEntitlement}
        leaveType='Casual'
      />
      <LeaveBalanceCard
        balance={currentEmployee?.leaveBalance?.medical}
        entitlement={currentEmployee?.leaveBalance?.medicalEntitlement}
        leaveType='Medical'
      />
      {currentEmployee?.employeeType === 'fullTime' &&
        currentEmployee?.leaveBalance?.broughtForward >= 1 && (
          <LeaveBalanceCard
            balance={currentEmployee?.leaveBalance?.broughtForward}
            entitlement={
              currentEmployee?.leaveBalance?.broughtForwardEntitlement
            }
            leaveType='Brought Forward'
          />
        )}
      {currentEmployee?.leaveBalance?.unpaid >= 1 && (
        <LeaveBalanceCard
          balance={currentEmployee?.leaveBalance?.unpaid}
          entitlement={currentEmployee?.leaveBalance?.unpaidEntitlement}
          leaveType='Unpaid'
        />
      )}
      {currentEmployee?.leaveBalance?.duty >= 1 && (
        <LeaveBalanceCard
          balance={currentEmployee?.leaveBalance?.duty}
          entitlement={currentEmployee?.leaveBalance?.dutyEntitlement}
          leaveType='Duty'
        />
      )}
    </div>
  );
};

export default LeaveBalance;
