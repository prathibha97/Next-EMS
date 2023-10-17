import useDepartments from '@/hooks/useDepartments';
import ViewDepartments from './components/view-departments';

const DepartmentsPage = async() => {
  const {getAllDepartments} = useDepartments()
  const departments = await getAllDepartments()
  return (
    <div>
      <ViewDepartments departments={departments} />
    </div>
  );
};

export default DepartmentsPage;
