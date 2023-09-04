'use client';
import {
  useGetAttendanceByIdQuery,
  useMarkAttendanceMutation,
} from '@/app/redux/services/attendanceApi';
import { useGetLoggedInEmployeeQuery } from '@/app/redux/services/employeeApi';
import ActionButton from '@/components/buttons/action-button';
import { DataTable } from '@/components/data-table';
import { toast } from '@/hooks/use-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { columns } from './components/columns';
import { Skeleton } from '@/components/ui/skeleton';

const AttendancePage = () => {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/');
    },
  });

  const { data: loggedInEmployee } = useGetLoggedInEmployeeQuery();
  const employeeId = loggedInEmployee?.id;

  const [markAttendance, { isLoading }] = useMarkAttendanceMutation();

  const { data: attendanceList , isLoading:isAttendanceDataLoading} = useGetAttendanceByIdQuery(employeeId as string);

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
    } catch (err) {
      toast({
        title: 'Error marking attendance',
        description: 'Please try again later',
        variant: 'destructive',
      });
    }
  };

  if(isAttendanceDataLoading) return <Skeleton/>

  return (
    <div className='w-[850px]'>
      <div className='flex justify-end'>
        <ActionButton
          onClick={handleMarkAttendance}
          label='Mark Attendance'
          isLoading={isLoading}
        />
      </div>
      <DataTable
        columns={columns}
        data={attendanceList?.attendance || []}
        searchFilter='date'
        placeholder='Date'
      />
    </div>
  );
};

export default AttendancePage;
