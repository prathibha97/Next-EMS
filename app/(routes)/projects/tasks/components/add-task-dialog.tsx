'use client';
import { useCreateTaskMutation } from '@/app/redux/services/taskApi';
import ActionButton from '@/components/buttons/action-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  TaskFormSchema,
  TaskFormValues,
} from '@/lib/validation/task-form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Employee, Project } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { labels, priorities } from '../../data/data';

export function AddTaskDialog() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [createTask, { isLoading: isCreateTaskLoading }] =
    useCreateTaskMutation();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      project: '',
      priority: 'Low',
      label: '',
      assignee: '',
    },
  });

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/projects`
      );
      setProjects(data);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/employees`
      );
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  const onSubmit = async (values: TaskFormValues) => {
    try {
      const res = await createTask({
        ...values,
      }).unwrap();
      toast({
        title: res.message,
      });
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Something went wrong!',
        description: 'Failed to create task, please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create New Task</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[525px] p-6'>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Create a milestone or a task for the selected project.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid gap-4 py-4'>
              <div className='w-full'>
                <Label>Title</Label>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <Input className='w-full' {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='w-full'>
                <Label>Description</Label>
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <Textarea className='w-full' {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='w-full'>
                <FormField
                  control={form.control}
                  name='project'
                  render={({ field }) => (
                    <FormItem>
                      <Label>Project</Label>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a project to display' />
                          </SelectTrigger>
                        </FormControl>
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
              </div>
              <div className='w-full'>
                <FormField
                  control={form.control}
                  name='assignee'
                  render={({ field }) => (
                    <FormItem>
                      <Label>Assignee</Label>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select an employee to display' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {employees.map((employee) => (
                            <SelectItem key={employee.id} value={employee.id}>
                              <div className='flex'>{employee.name}</div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='w-full'>
                <FormField
                  control={form.control}
                  name='priority'
                  render={({ field }) => (
                    <FormItem>
                      <Label>Priority</Label>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a priority to display' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {priorities.map((priority) => (
                            <SelectItem
                              key={priority.value}
                              value={priority.value}
                            >
                              <div className='flex'>
                                {priority.icon && (
                                  <priority.icon className='mr-2 h-4 w-4 text-muted-foreground' />
                                )}
                                {priority.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='w-full'>
                <FormField
                  control={form.control}
                  name='label'
                  render={({ field }) => (
                    <FormItem>
                      <Label>Label</Label>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a label to display' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {labels.map((label) => (
                            <SelectItem key={label.value} value={label.value}>
                              {label.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <ActionButton
              type='submit'
              label='Create Task'
              isLoading={isCreateTaskLoading}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
