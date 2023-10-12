import useProject from '@/hooks/useProject';
import ViewProjects from './components/view-projects';

export const revalidate = 0;

const ProjectPage = async () => {
  const { getAllProjects } = useProject();
  const projects = await getAllProjects();
  return (
    <div>
      <ViewProjects projects={projects} />
    </div>
  );
};

export default ProjectPage;
