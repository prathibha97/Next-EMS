import { FC } from 'react'
import LeaveBalanceCard from './leave-balance-card'
import { Employee, LeaveBalance } from '@prisma/client'

interface LeaveBalanceProps {
  currentEmployee : Employee & {
    leaveBalance: LeaveBalance
  }
}

const LeaveBalance: FC<LeaveBalanceProps> = ({currentEmployee}) => {
  return <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 mb-5'>
        <LeaveBalanceCard
          balance={currentEmployee?.leaveBalance?.annual}
          entitlement={currentEmployee?.employeeType === 'fullTime' ? 7 : 0}
          leaveType='Annual'
        />
        <LeaveBalanceCard
          balance={currentEmployee?.leaveBalance?.casual}
          entitlement={currentEmployee?.employeeType === 'fullTime' ? 7 : 1}
          leaveType='Casual'
        />
        <LeaveBalanceCard
          balance={currentEmployee?.leaveBalance?.medical}
          entitlement={currentEmployee?.employeeType === 'fullTime' ? 7 : 1}
          leaveType='Medical'
        />
        {currentEmployee?.employeeType === 'fullTime' &&
          currentEmployee?.leaveBalance?.broughtForward >= 1 && (
            <LeaveBalanceCard
              balance={currentEmployee?.leaveBalance?.broughtForward}
              entitlement={currentEmployee?.employeeType === 'fullTime' ? 4 : 0}
              leaveType='Brought Forward'
            />
          )}
        {currentEmployee?.leaveBalance?.duty >= 1 && (
          <LeaveBalanceCard
            balance={currentEmployee?.leaveBalance?.unpaid}
            entitlement={currentEmployee?.leaveBalance?.duty}
            leaveType='Unpaid'
          />
        )}
        {currentEmployee?.leaveBalance?.duty >= 1 && (
          <LeaveBalanceCard
            balance={currentEmployee?.leaveBalance?.duty}
            entitlement={currentEmployee?.leaveBalance?.duty}
            leaveType='Duty'
          />
        )}
      </div>
}

export default LeaveBalance