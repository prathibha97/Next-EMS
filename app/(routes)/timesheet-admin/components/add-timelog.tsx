'use client';
import { useCreateTimeLogMutation } from '@/app/redux/services/timeLogApi';
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
import { Project, Task } from '@prisma/client';
import axios from 'axios';
import { differenceInMinutes, format, parseISO } from 'date-fns';
import { AlarmPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface AddTimeLogDialogProps {
  employeeId: string;
}

export function AddTimeLogDialog({ employeeId }: AddTimeLogDialogProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const now = new Date();
  const formattedDate = format(now, 'yyyy-MM-dd');
  const formattedTime = format(now, 'HH:mm');

  const form = useForm<TimeRecordFormValues>({
    resolver: zodResolver(TimeRecordFormSchema),
    defaultValues: {
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: `${formattedDate}T${formattedTime}`,
      endTime: `${formattedDate}T${formattedTime}`,
      description: '',
      taskId: '',
      projectId: '',
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

  const [createTimeLog, { isLoading: isCreateTimeLogLoading }] =
    useCreateTimeLogMutation();

  const onSubmit = async (values: TimeRecordFormValues) => {
    try {
      const parsedStartTime = parseISO(values.startTime);
      const parsedEndTime = parseISO(values.endTime);

      const hoursWorked = (
        differenceInMinutes(parsedEndTime, parsedStartTime) / 60
      ).toFixed(2);
      await createTimeLog({
        date: new Date(values.date),
        startTime: parsedStartTime,
        endTime: parsedEndTime,
        description: values.description,
        taskId: values.taskId,
        projectId: values.projectId,
        employeeId,
        hoursWorked: parseFloat(hoursWorked),
      }).unwrap();
      toast({
        title: 'Time record added successfully',
      });
      router.refresh();
      setIsOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: 'Something went wrong!',
        description: 'Failed to create the time record, please try again',
        variant: 'destructive',
      });
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <AlarmPlus className='h-4 w-4 mr-2' />
          Add Time Record
        </Button>
      </DialogTrigger>
      <DialogContent className='w-full p-5 justify-center items-center'>
        <DialogHeader>
          <DialogTitle>Add Time Record</DialogTitle>
          <DialogDescription>
            Add a time record for the task you worked for.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-y-3 md:gap-x-3'>
              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Date</FormLabel>
                    <Input
                      {...field}
                      className='w-full'
                      type='date'
                      defaultValue={format(new Date(), 'yyyy-MM-dd')}
                      disabled
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='projectId'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Project</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select a project to display' />
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
                name='taskId'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Task</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select a task to display' />
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
              <div className='flex flex-col md:flex-row gap-x-3'>
                <FormField
                  control={form.control}
                  name='startTime'
                  render={({ field }) => (
                    <FormItem className='md:w-1/2'>
                      <FormLabel>Start Time</FormLabel>
                      <Input
                        {...field}
                        className='w-full'
                        type='datetime-local'
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='endTime'
                  render={({ field }) => (
                    <FormItem className='md:w-1/2'>
                      <FormLabel>End Time</FormLabel>
                      <Input
                        {...field}
                        className='w-full'
                        type='datetime-local'
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Work Performed</FormLabel>
                    <Textarea {...field} className='w-full' />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className='mt-5 gap-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  setIsOpen(false);
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <ActionButton
                type='submit'
                label='Create Time Record'
                isLoading={isCreateTimeLogLoading}
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
