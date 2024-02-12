import useProject from '@/hooks/useProject';
import { Progress } from '@/components/ui/progress';
import { getAuthSession } from '@/app/api/auth/[...nextauth]/options';

export async function RecentProjects() {
  const session = await getAuthSession();

  const { getDashboardProjects, getCurrentEmployeeProjects } = useProject();
  const projects = await getDashboardProjects();

  const currentEmployeeProjects = await getCurrentEmployeeProjects();

  const projectsToDisplay =
    session?.user.role === 'ADMIN' ? projects : currentEmployeeProjects;

  return (
    <div className="space-y-8 md:min-h-[350px] md:max-h-[350px] overflow-y-auto">
      {projectsToDisplay.length > 0 ? (
        projectsToDisplay.map((project) => {
          return (
            <div key={project.id} className="flex items-center justify-between">
              <div className="basis-1/2 ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {project.name}
                </p>
                <p className="text-sm text-muted-foreground text-gray-600">
                  {project.client.name}
                </p>
              </div>
              <div className="basis-1/2 w-1/3 md:w-1/2 mr-5">
                <Progress value={project.progress} />
              </div>
              <span className="basis-1/3 md:basis-1/6 ml-5">
                {project.progress} %
              </span>
              {/* <span className="ml-5">50 %</span> */}
            </div>
          );
        })
      ) : (
        <div className="h-full my-auto">
          <p className="text-center">No projects to display</p>
        </div>
      )}
    </div>
  );
}
