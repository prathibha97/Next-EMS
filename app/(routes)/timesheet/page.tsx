
'use client';
import { DataTable } from '@/components/data-table';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';import React from 'react'
import { columns } from './components/columns';
import { timesheet_data } from '@/constants/sample/timesheet-data';
import { TimeSheetTable } from './components/time-sheet-table';

const TimeSheetPage = () => {
const router = useRouter();
const { data: session } = useSession({
  required: true,
  onUnauthenticated() {
    router.push('/');
  },
});


  return (
    <div>
      <TimeSheetTable
        columns={columns}
        data={timesheet_data}
        searchFilter='project'
        placeholder='Project'
      />
    </div>
  );
}

export default TimeSheetPage