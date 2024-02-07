'use client';
import { useMarkAttendanceMutation } from '@/app/redux/services/attendanceApi';
import ActionButton from '@/components/buttons/action-button';
import { DataTable } from '@/components/data-table';
import { toast } from '@/hooks/use-toast';
import { filterAttendanceByMonth } from '@/lib/filterAttendanceByMonth';
import { Attendance } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { columns } from './columns';

interface ViewAttandanceProps {
  attendanceList: Attendance[];
  employeeId: string;
}

const ViewAttandance: FC<ViewAttandanceProps> = ({
  attendanceList,
  employeeId,
}) => {
  const router = useRouter();

  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const [markAttendance, { isLoading }] = useMarkAttendanceMutation();

  const filteredAttendance = selectedMonth
    ? filterAttendanceByMonth(attendanceList, selectedMonth)
    : attendanceList;

  const handleMarkAttendance = async () => {
    try {
      const attendanceData = {
        date: new Date(),
        timeIn: new Date(),
        timeOut: new Date(),
        employeeId,
      };
      const response = await markAttendance(attendanceData).unwrap();

      if (response.error) {
        toast({
          title: response.error,
          variant: 'destructive',
        });
        return;
      }
      toast({
        title: response.message,
      });
      router.refresh();
    } catch (err) {
      toast({
        title: 'Error marking attendance',
        description: 'Please try again later',
        variant: 'destructive',
      });
    }
  };
  return (
    <div className="w-full space-y-5">
      <div className="flex flex-row justify-between">
        <div className="flex justify-between">
          <ActionButton
            onClick={handleMarkAttendance}
            label="Mark Attendance"
            isLoading={isLoading}
          />
        </div>
        <div>
          <select
            value={selectedMonth || ''}
            onChange={(e) => setSelectedMonth(Number(e.target.value) || null)}
            className="p-2 px-4 rounded-lg text-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <option value="">All Months</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {new Date(2023, month - 1, 1).toLocaleString('default', {
                  month: 'long',
                })}
              </option>
            ))}
          </select>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredAttendance}
        searchFilter="date"
        placeholder="Date"
      />
    </div>
  );
};

export default ViewAttandance;
