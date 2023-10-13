'use client';
import { useRemoveProjectMutation } from '@/app/redux/services/projectApi';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { ProjectWithClientWithAssigneesWithTasks } from '@/types';
import { format } from 'date-fns';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import EditProjectDialog from './edit-project-dialog';

interface ViewProjectProps {
  project: ProjectWithClientWithAssigneesWithTasks | null;
}

const ViewProject: FC<ViewProjectProps> = ({ project }) => {
  const router = useRouter();
  const [removeProject, { isLoading: isRemoveProjectLoading }] =
    useRemoveProjectMutation();

  const handleRemoveProject = async (id: string) => {
    try {
      await removeProject(id);
      toast({
        title: 'Project removed successfully',
      });
      router.push('/projects');
      router.refresh();
    } catch (error) {
      console.log(error);
      return toast({
        title: 'Something went wrong!',
        description: 'Failed to remove client, please try again.',
        variant: 'destructive',
      });
    }
  };
  return (
    <div>
      <div className='flex space-x-3'>
        <EditProjectDialog project={project} />
        <Button
          onClick={() => handleRemoveProject(project?.id || '')}
          variant='destructive'
          size='icon'
        >
          {isRemoveProjectLoading && (
            <Icons.spinner className='mr-2 ml-2 h-5 w-5 animate-spin' />
          )}
          <Trash />
        </Button>
      </div>
      <div>
        <p>name: {project?.name}</p>
        <p>client: {project?.client.name}</p>
        <p>status: {project?.status}</p>
        <p>deadline: {format(project?.endDate as Date, 'dd-MM-yyyy')}</p>
        <p>tasks: {project?.tasks.map(task => task.title)}</p>
      </div>
    </div>
  );
};

export default ViewProject;
