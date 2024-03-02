'use client';
import { useUpdateTimeLogMutation } from '@/app/redux/services/timeLogApi';
import ActionButton from '@/components/buttons/action-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import {
  TimeRecordFormSchema,
  TimeRecordFormValues,
} from '@/lib/validation/time-record-form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Project, Task, TaskWork } from '@prisma/client';
import axios from 'axios';
import { differenceInMinutes, format, parseISO } from 'date-fns';
import { AlarmPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface EditTimeLogDialogProps {
  employeeId: string;
  isOpen: boolean;
  timeLog: TaskWork;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function EditTimeLogDialog({
  employeeId,
  isOpen,
  setIsOpen,
  timeLog,
}: EditTimeLogDialogProps) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const formattedStartDate = format(timeLog.startTime, 'yyyy-MM-dd');
  const formattedStartTime = format(timeLog.startTime, 'HH:mm');

  const formattedEndDate = format(timeLog.endTime, 'yyyy-MM-dd');
  const formattedEndTime = format(timeLog.endTime, 'HH:mm');

  const form = useForm<TimeRecordFormValues>({
    resolver: zodResolver(TimeRecordFormSchema),
    defaultValues: {
      date: format(timeLog.date, 'yyyy-MM-dd'),
      startTime: `${formattedStartDate}T${formattedStartTime}`,
      endTime: `${formattedEndDate}T${formattedEndTime}`,
      description: timeLog.description!,
      taskId: timeLog.taskId,
      projectId: timeLog.projectId!,
    },
  });

  const project = form.watch('projectId');

  useEffect(() => {
    const getProjects = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/projects/my`
      );
      setProjects(data);
    };

    getProjects();
  }, []);

  useEffect(() => {
    if (project) {
      const fetchTasks = async () => {
        try {
          const url = qs.stringifyUrl({
            url: `${process.env.NEXT_PUBLIC_URL}/projects/tasks`,
            query: {
              projectId: project,
            },
          });
          const response = await axios.get(url);

          const tasks = response.data;
          setTasks(tasks);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };
      fetchTasks();
    }
  }, [project]);

  const [updateTimeLog, { isLoading: isEditTimeLogLoading }] =
    useUpdateTimeLogMutation();

  const onSubmit = async (values: TimeRecordFormValues) => {
    try {
      const parsedStartTime = parseISO(values.startTime);
      const parsedEndTime = parseISO(values.endTime);

      const hoursWorked = (
        differenceInMinutes(parsedEndTime, parsedStartTime) / 60
      ).toFixed(2);
      await updateTimeLog({
        body: {
          date: new Date(values.date),
          startTime: parsedStartTime,
          endTime: parsedEndTime,
          description: values.description,
          taskId: values.taskId,
          projectId: values.projectId,
          employeeId,
          hoursWorked: parseFloat(hoursWorked),
        },
        timeLogId: timeLog.id,
      }).unwrap();
      toast({
        title: 'Time record updated successfully',
      });
      router.refresh();
      setIsOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: 'Something went wrong!',
        description: 'Failed to update the time record, please try again',
        variant: 'destructive',
      });
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <AlarmPlus className="h-4 w-4 mr-2" />
          Edit Time Record
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] p-5">
        <DialogHeader>
          <DialogTitle>Edit Time Record</DialogTitle>
          <DialogDescription>
            Edit a time record for the task you worked for.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col w-full gap-y-3">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Date</FormLabel>
                    <Input {...field} className="w-full" type="date" />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Project</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a project to display" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="taskId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Task</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a task to display" />
                      </SelectTrigger>
                      <SelectContent>
                        {tasks.map((task) => (
                          <SelectItem key={task.id} value={task.id}>
                            {task.taskId}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col md:flex-row gap-x-3">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem className="md:w-1/2">
                      <FormLabel>Start Time</FormLabel>
                      <Input
                        {...field}
                        className="w-full"
                        type="datetime-local"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem className="md:w-1/2">
                      <FormLabel>End Time</FormLabel>
                      <Input
                        {...field}
                        className="w-full"
                        type="datetime-local"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Work Performed</FormLabel>
                    <Textarea {...field} className="w-full" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-5 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsOpen(false);
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <ActionButton
                type="submit"
                label="Edit Time Record"
                isLoading={isEditTimeLogLoading}
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
