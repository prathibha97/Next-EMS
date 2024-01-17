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
              {session?.user.role === 'ADMIN' && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="bg-white drop-shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Revenue
                      </CardTitle>
                      <div>
                        <Image
                          src="/icons/revenue.png"
                          alt="Image 1"
                          width={50}
                          height={50}
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$45,231.89</div>
                      <p className="text-xs text-muted-foreground text-teal-500">
                        +20.1% from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white drop-shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Subscriptions
                      </CardTitle>
                      <Image
                        src="/icons/subscriptions.png"
                        alt="Image 1"
                        width={50}
                        height={50}
                      />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+2350</div>
                      <p className="text-xs text-muted-foreground text-teal-400">
                        +180.1% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white drop-shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Sales
                      </CardTitle>
                      <Image
                        src="/icons/sales.png"
                        alt="Image 1"
                        width={50}
                        height={50}
                      />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+12,234</div>
                      <p className="text-xs text-muted-foreground text-teal-400">
                        +19% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white drop-shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Active Now
                      </CardTitle>
                      <Image
                        src="/icons/active.png"
                        alt="Image 1"
                        width={50}
                        height={50}
                      />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+573</div>
                      <p className="text-xs text-muted-foreground text-teal-400">
                        +201 since last hour
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              <Card className="col-span-4 bg-white drop-shadow-lg ">
                <CardHeader>
                  <CardTitle>Performance Insights</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  {(session?.user.role === 'ADMIN' && (
                    <WorkedHoursOverviewAdmin
                      workedHours={totalWorkedHours}
                    />
                  )) || <WorkedHoursOverview workedHours={workedHours} />}
                </CardContent>
              </Card>

              <div className="flex flex-col md:flex-row w-full">
                <Card className="flex-1 md:w-1/2 bg-white drop-shadow-lg md:mr-2">
                  <CardHeader>
                    <CardTitle>Recent Projects</CardTitle>
                    <CardDescription>Ongoing projects</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <RecentProjects />
                  </CardContent>
                </Card>

                {(session?.user.role === 'ADMIN' && (
                  <Card className="flex-1 md:w-1/2 bg-white drop-shadow-lg">
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
                  <Card className="flex-1 md:w-1/2 bg-white drop-shadow-lg">
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
