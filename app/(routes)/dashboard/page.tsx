import { getAuthSession } from '@/app/api/auth/[...nextauth]/options';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import Image from 'next/image';
import { CalendarDateRangePicker } from './components/date-range-picker';
import { RecentProjects } from './components/recent-projects';
import { EmployeeAttendance } from './components/attendance';
import useTasks from '@/hooks/useTasks';
import TaskStatistics from './components/task-statistics';
import WorkedHoursOverview from './components/overview';
import useWorkedHours from '@/hooks/useWorkedHours';
import useEmployee from '@/hooks/useEmployee';
import WorkedHoursOverviewAdmin from './components/overview-admin';

export default async function DashboardPage() {
  const session = await getAuthSession();

  const { getTaskByUser } = useTasks();
  const tasks = await getTaskByUser(session?.user.id!);

  const { getLoggedInEmployee } = useEmployee();
  const currentEmployee = await getLoggedInEmployee();

  const { getWorkedHoursByEmployeeId, getWorkedHoursAllEmployees } =
    useWorkedHours();
  const workedHours = await getWorkedHoursByEmployeeId(currentEmployee?.id!);
  const totalWorkedHours = await getWorkedHoursAllEmployees();

  return (
    <div>
      <div className="md:container flex-col md:flex">
        <div className=" flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="accc text-3xl font-bold tracking-tight">
              Dashboard
            </h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <Card className="col-span-4 bg-white drop-shadow-lg ">
                <CardHeader>
                  <CardTitle>Performance Insights</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  {(session?.user.role === 'ADMIN' && (
                    <WorkedHoursOverviewAdmin workedHours={totalWorkedHours} />
                  )) || <WorkedHoursOverview workedHours={workedHours} />}
                </CardContent>
              </Card>

              <div className="flex flex-col md:flex-row w-full gap-4">
                <div className="w-full">
                  <Card className="flex-1 bg-white drop-shadow-lg h-full">
                    <CardHeader>
                      <CardTitle>Recent Projects</CardTitle>
                      <CardDescription>Ongoing projects</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <RecentProjects />
                    </CardContent>
                  </Card>
                </div>
                <div className="w-full">
                  {(session?.user.role === 'ADMIN' && (
                    <Card className="flex-1 bg-white drop-shadow-lg h-full">
                      <CardHeader>
                        <CardTitle>Attendance</CardTitle>
                        <CardDescription>
                          Todays's employee attendance
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <EmployeeAttendance />
                      </CardContent>
                    </Card>
                  )) || (
                    <Card className="flex-1 bg-white drop-shadow-lg h-full">
                      <CardHeader>
                        <CardTitle>Task Statistics</CardTitle>
                        <CardDescription>
                          Statistics of tasks allocated to you
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <TaskStatistics tasks={tasks} />
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
