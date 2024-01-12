import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useAttendance from '@/hooks/useAttendance';
import useEmployee from '@/hooks/useEmployee';

export async function EmployeeAttendance() {
  const { getAllEmployees } = useEmployee();
  const employees = await getAllEmployees();
  const { getAttendanceByEmployeeId } = useAttendance();

  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-8 overflow-y-scroll max-h-screen">
      {employees.map(async (employee) => {
        const attendance = await getAttendanceByEmployeeId(employee.id);
        const todayAttendance = attendance.find(
          (record) => record?.date?.toISOString().split('T')[0] === currentDate
        );

        return (
          <div key={employee.id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={employee?.profile_photo || '/avatar.jpeg'}
                alt="Avatar"
              />
              <AvatarFallback>{employee.name}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {employee.name}
              </p>
              <p className="text-sm text-muted-foreground text-gray-600">
                {employee.workEmail}
              </p>
            </div>
            <div
              className={`ml-auto font-medium ${
                todayAttendance ? 'text-green-500' : 'text-red-500'
              } `}
            >
              {todayAttendance ? 'Present' : 'Absent'}
            </div>
          </div>
        );
      })}
    </div>
  );
}
