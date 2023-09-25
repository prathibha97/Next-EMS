import useLeaves from '@/hooks/useLeaves';
import { columns } from './components/columns';
import { LeavesDataTable } from './components/leaves-datatable';

const LeavesPage = async () => {
  const { getAllLeaveRequests } = useLeaves();

  const leaves = await getAllLeaveRequests();
  console.log(leaves);
  return (
    <div>
      <LeavesDataTable columns={columns} data={leaves} />
    </div>
  );
};

export default LeavesPage;
