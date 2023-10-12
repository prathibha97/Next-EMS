import useProject from '@/hooks/useProject';
import { FC } from 'react';
import ViewClient from './components/view-project';

interface ProjectIdPageProps {
  params: {
    projectId: string;
  };
}

export const revalidate = 0;

const ProjectIdPage: FC<ProjectIdPageProps> = async ({ params }) => {
  const { getProjectById } = useProject();
  const project = await getProjectById(params.projectId);
  return (
    <div>
      {/* @ts-ignore */}
      <ViewClient project={project} />
    </div>
  );
};

export default ProjectIdPage;
