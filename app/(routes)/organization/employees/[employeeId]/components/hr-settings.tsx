import { Separator } from '@/components/ui/separator';
import { Employee } from '@prisma/client';
import { FC } from 'react';

// Import the styles
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { BadgeCheck, Banknote, Briefcase } from 'lucide-react';

interface HRSettingsProps {
  employee: Employee | null;
}

const HRSettings: FC<HRSettingsProps> = ({ employee }) => {
  return (
    <>
      <div className="mt-3 mb-5">
        <h2 className="text-lg font-semibold">Employee Documents</h2>
        <Separator className="mt-1 mb-3" />
        <div className="flex flex-col md:flex-row justify-evenly md:space-x-5 gap-2 mt-3">
          <Button
            variant={'outline'}
            className={cn(
              'w-[280px] justify-start text-left font-normal',
              !employee?.resumeCopy && 'text-muted-foreground'
            )}
          >
            <div className="flex flexcol justify-center items-center mx-auto">
              <Briefcase className="mr-2 h-4 w-4" />
              {employee?.resumeCopy ? (
                <a
                  href={employee.resumeCopy}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume Copy
                </a>
              ) : (
                <span>No Resume Copy available</span>
              )}
            </div>
          </Button>

          <Button
            variant={'outline'}
            className={cn(
              'w-[280px] justify-start text-left font-normal',
              !employee?.passbookCopy && 'text-muted-foreground'
            )}
          >
            <div className="flex flexcol justify-center items-center mx-auto">
              <Banknote className="mr-2 h-4 w-4" />
              {employee?.passbookCopy ? (
                <a
                  href={employee.passbookCopy}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Passbook Copy
                </a>
              ) : (
                <span>No Passbook Copy available</span>
              )}
            </div>
          </Button>

          <Button
            variant={'outline'}
            className={cn(
              'w-[280px] justify-start text-left font-normal',
              !employee?.idCopy && 'text-muted-foreground'
            )}
          >
            <div className="flex flexcol justify-center items-center mx-auto">
              <BadgeCheck className="mr-2 h-4 w-4" />
              {employee?.idCopy ? (
                <a
                  href={employee.idCopy}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View NIC Copy
                </a>
              ) : (
                <span>No NIC Copy available</span>
              )}
            </div>
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        {/* Status */}
        <div>
          <h2 className="text-lg font-semibold">Status</h2>
          <Separator className="mt-1 mb-3" />
          <div className="flex flex-col gap-y-4">
            <span>
              Employee Number :{' '}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {employee?.employeeNumber}
              </span>
            </span>

            <span>
              Related User:{' '}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {/* @ts-ignore */}
                {employee?.user?.email || 'No user related'}
              </span>
            </span>
          </div>
        </div>
        <div className='mt-5'>
          <h2 className="text-lg font-semibold">Salary Information</h2>
          <Separator className="mt-1 mb-3" />
          <div className="flex flex-col gap-y-4">
            <span>
              Basic Salary :{' '}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {employee?.basicSalary}
              </span>
            </span>

            <span>
              Performance Allowance:{' '}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {employee?.performanceAllowance ||
                  'Performance Allowance not applicable'}
              </span>
            </span>

            <span>
              Mobile Allowance:{' '}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {employee?.mobileAllowance || 'Mobile Allowance not applicable'}
              </span>
            </span>

            <span>
              Data Allowance:{' '}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {employee?.dataAllowance || 'Data Allowance not applicable'}
              </span>
            </span>
          </div>
        </div>

        <div className='mt-5'>
          <h2 className="text-lg font-semibold">Leave Information</h2>
          <Separator className="mt-1 mb-3" />
          <div className="flex flex-col gap-y-4">
            <span>
              Medical Leaves :{' '}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {employee?.leaveBalanceId}
              </span>
            </span>

            <span>
              Casual Leaves:{' '}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {/* @ts-ignore */}
                {employee?.leaveBalanceId}
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HRSettings;
