'use client';
import { useRemoveProjectMutation } from '@/app/redux/services/projectApi';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ProjectWithClientWithAssigneesWithTasks } from '@/types';
import { Task } from '@prisma/client';
import { format } from 'date-fns';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { columns } from '../../tasks/components/project-tasks-columns';
import { DataTable } from './data-table';
import EditProjectDialog from './edit-project-dialog';
import ProjectInsightsChart from './project-insights-chart';

interface ViewProjectProps {
  project: ProjectWithClientWithAssigneesWithTasks | null;
  tasks: Task[];
}

const ViewProject: FC<ViewProjectProps> = ({ project, tasks }) => {
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
  console.log(tasks);
  return (
    <div className="bg-white dark:bg-black/60 p-8 rounded shadow-lg">
      <div className="flex justify-between mb-4">
        <EditProjectDialog project={project} />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon">
              {isRemoveProjectLoading && (
                <div className="animate-spin">
                  <div className="spinner" />
                </div>
              )}
              <Trash />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete
                project and your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleRemoveProject(project?.id || '')}
                className="bg-red-500"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">{project?.name}</h2>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-bold">Client:</p>
            <p className="dark:text-slate-200">{project?.client.name}</p>
          </div>
          <div>
            <p className="font-bold">Status:</p>
            <p
              className={cn(
                'text-black',
                project?.status === 'ACTIVE' && 'text-green-500',
                project?.status === 'ON_HOLD' && 'text-yellow-500'
              )}
            >
              {project?.status}
            </p>
          </div>
          <div>
            <p className="font-bold">Assigned to:</p>
            <p className="dark:text-slate-200">
              {project?.projectAssignees
                //  @ts-ignore
                .map((assignee: any) => assignee.employee.name)
                .join(', ')}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-bold">Deadline:</p>
          <p className="dark:text-slate-200">
            {format(project?.endDate as Date, 'dd-MM-yyyy')}
          </p>
        </div>
        <div className="mt-4">
          <p className="font-bold mb-1">Progress:</p>
          <Progress value={project?.progress} />
        </div>
      </div>

      <Tabs defaultValue="tasks" className="w-full mt-6">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks">
          {project?.tasks?.length && project?.tasks?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">Tasks</h3>
              <div>
                {/* @ts-ignore */}
                <DataTable data={tasks} columns={columns} />
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="insights">
          <div className="flex items-center justify-center w-full">
            <ProjectInsightsChart tasks={tasks} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ViewProject;
