import useLeaves from '@/hooks/useLeaves';
import { columns } from './components/columns';
import { LeavesDataTable } from './components/leaves-datatable';

export const revalidate = 0;

const LeavesPage = async () => {
  const { getAllLeaveRequests } = useLeaves();

  const leaves = await getAllLeaveRequests();
  return (
    <div className='md:w-[1000px] 2xl:w-[1170px]'>
      <LeavesDataTable
      // @ts-ignore
        columns={columns}
        data={leaves}
        searchFilter='employee_name'
        placeholder='Date'
      />
    </div>
  );
};

export default LeavesPage;
