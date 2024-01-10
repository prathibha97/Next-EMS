import useAttendance from '@/hooks/useAttendance';
import useEmployee from '@/hooks/useEmployee';
import ViewAttandance from './components/view-attandance';

const AttendancePage = async () => {
  const { getLoggedInEmployee } = useEmployee();
  const employee = await getLoggedInEmployee();

  const { getAttendanceByEmployeeId } = useAttendance();
  const attendanceList = await getAttendanceByEmployeeId(employee?.id!);

  return (
    <div>
      <ViewAttandance
        attendanceList={attendanceList}
        employeeId={employee?.id!}
      />
    </div>
  );
};

export default AttendancePage;
