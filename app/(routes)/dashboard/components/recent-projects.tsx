import useProject from '@/hooks/useProject';
import { Progress } from '@/components/ui/progress';

export async function RecentProjects() {
  const { getAllProjects } = useProject();
  const projects = await getAllProjects();

  return (
    <div className="space-y-8 md:min-h-[350px] max-h-screen">
      {projects.map(async (project) => {
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
      })}
    </div>
  );
}
