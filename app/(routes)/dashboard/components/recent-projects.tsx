import useProject from '@/hooks/useProject';
import { Progress } from '@/components/ui/progress';
import { getAuthSession } from '@/app/api/auth/[...nextauth]/options';

export async function RecentProjects() {
  const session = await getAuthSession()

  const { getDashboardProjects, getCurrentEmployeeProjects } = useProject();
  const projects = await getDashboardProjects();

  const currentEmployeeProjects = await getCurrentEmployeeProjects();

  const projectsToDisplay = session?.user.role === 'ADMIN' ? projects : currentEmployeeProjects

  return (
    <div className="space-y-8 md:min-h-[350px] max-h-screen">
      {projectsToDisplay.length > 0 ? projectsToDisplay.map((project) => {
        return (
          <div
            key={project.id}
            className="flex items-center justify-between overflow-y-scroll"
          >
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{project.name}</p>
              <p className="text-sm text-muted-foreground text-gray-600">
                {project.client.name}
              </p>
            </div>
            <div className="ml-auto font-medium flex space-x-2">
              <div className="flex space-x-2"></div>
            </div>
            <div className="w-1/3 md:w-1/2">
              <Progress value={project.progress} />
            </div>
            <span className="ml-2">%</span>
          </div>
        );
      }) : (
        <div className='h-full my-auto'>
          <p className='text-center'>No projects to display</p>
        </div>
      )}
    </div>
  );
}
