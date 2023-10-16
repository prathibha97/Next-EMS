import useProject from '@/hooks/useProject';
import { FC } from 'react';
import ViewProject from './components/view-project';
import useTasks from '@/hooks/useTasks';

interface ProjectIdPageProps {
  params: {
    projectId: string;
  };
}

export const revalidate = 0;

const ProjectIdPage: FC<ProjectIdPageProps> = async ({ params }) => {
  const { getProjectById } = useProject();
  const {getTaskByProjectId} = useTasks()

  const project = await getProjectById(params.projectId);

  const tasks = await getTaskByProjectId(params.projectId);
  return (
    <div>
      {/* @ts-ignore */}
      <ViewProject project={project} tasks={tasks}/>
    </div>
  );
};

export default ProjectIdPage;
