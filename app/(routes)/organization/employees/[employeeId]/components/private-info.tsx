import { Separator } from '@/components/ui/separator';
import { Employee } from '@prisma/client';
import { format } from 'date-fns';
import { FC } from 'react';

interface PrivateInfoProps {
  employee: Employee | null;
}

const PrivateInfo: FC<PrivateInfoProps> = ({ employee }) => {
  return (
    <>
      <div className="flex justify-between">
        {/* Private Contact */}
        <div>
          <h2 className="text-lg font-semibold">Private Contact</h2>
          <Separator className="mt-1 mb-3" />
          <div className="flex flex-col gap-y-4">
            <div className="flex gap-x-2">
              <span>Private Address: </span>

              <span className="text-sm text-gray-600 dark:text-gray-300">
                {employee?.privateAddress}
              </span>
            </div>
            <span>
              Personal Email :{' '}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {employee?.personalEmail}
              </span>
            </span>
            <span>
              Phone :{' '}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {employee?.phone}
              </span>
            </span>
            <span>
              Bank Account Number :{' '}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {employee?.bankAccountNumber}
              </span>
            </span>
          </div>
        </div>

        {/* Family Status */}
        <div>
          <h2 className="text-lg font-semibold">Family Status</h2>
          <Separator className="mt-1 mb-3" />
          <div className="flex flex-col gap-y-4">
            <span>
              Marital Status :{' '}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {employee?.maritalStatus}
              </span>
            </span>
            <span>
              Number of dependent children :{' '}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {employee?.numberOfDependents}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Emergency contacts */}
      <div className="flex justify-between mt-5">
        <div>
          <h2 className="text-lg font-semibold">Emergency Contact</h2>
          <Separator className="mt-1 mb-3" />
          <div className="flex flex-col gap-y-4">
            <span>
              Contact Name :{' '}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {employee?.emergencyContactName}
              </span>
            </span>
            <span>
              Contact Number :{' '}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {employee?.emergencyContactPhone}
              </span>
            </span>
          </div>
        </div>

        {/* Citizenship*/}

        <div>
          <h2 className="text-lg font-semibold">Citizenship</h2>
          <Separator className="mt-1 mb-3" />
          <div className="flex flex-col gap-y-4">
            <span>
              Nationality :{' '}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {employee?.nationality}
              </span>
            </span>
            <span>
              Identification Number :{' '}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {employee?.idNumber}
              </span>
            </span>
            <span>
              Gender :{' '}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {employee?.gender}
              </span>
            </span>
            <span>
              date of Birth :{' '}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {format(new Date(employee?.dateOfBirth as Date), 'MM/dd/yyyy')}
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateInfo;
