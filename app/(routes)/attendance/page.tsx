'use client';
import ActionButton from '@/components/buttons/action-button';
import { DataTable } from '@/components/data-table';
import { toast } from '@/hooks/use-toast';
import { Attendance } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { columns } from './components/columns';

const AttendancePage = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === 'unauthenticated') {
    router.push('/');
  }

  const data: Attendance = [
    {
      id: '1',
      date: '2023-08-15T09:00:00Z',
      timeIn: '2023-08-15T09:00:00Z',
      timeOut: '2023-08-15T17:00:00Z',
      employeeId: '1001',
    },
    {
      id: '2',
      date: '2023-08-15T09:30:00Z',
      timeIn: '2023-08-15T09:30:00Z',
      timeOut: '2023-08-15T17:30:00Z',
      employeeId: '1002',
    },
    {
      id: '3',
      date: '2023-08-16T08:45:00Z',
      timeIn: '2023-08-16T08:45:00Z',
      timeOut: '2023-08-16T16:45:00Z',
      employeeId: '1001',
    },
    {
      id: '4',
      date: '2023-08-16T09:15:00Z',
      timeIn: '2023-08-16T09:15:00Z',
      timeOut: '2023-08-16T17:15:00Z',
      employeeId: '1002',
    },
    {
      id: '5',
      date: '2023-08-17T09:00:00Z',
      timeIn: '2023-08-17T09:00:00Z',
      timeOut: null,
      employeeId: '1001',
    },
    {
      id: '6',
      date: '2023-08-17T09:30:00Z',
      timeIn: '2023-08-17T09:30:00Z',
      timeOut: null,
      employeeId: '1002',
    },
  ];

  const handleMarkAttendance = () => {
    console.log('Mark attendance');
    try {
      fetch('/api/attendance')
      toast({
        title: 'Attendance marked',
      });
    } catch (error: any) {
      toast({
        title: 'Error marking attendance',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='w-[850px]'>
      <div className='flex justify-end'>
        <ActionButton onClick={handleMarkAttendance} label='Mark Attendance' />
      </div>
      <DataTable
        columns={columns}
        data={data}
        searchFilter='date'
        placeholder='date'
      />
    </div>
  );
};

export default AttendancePage;
