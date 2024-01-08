'use client';
import { setDepartments } from '@/app/redux/features/departmentSlice';
import { useAppDispatch } from '@/app/redux/hooks';
import {
  useAddDepartmentMutation,
  useGetDepartmentsQuery,
} from '@/app/redux/services/departmentApi';
import { useGetEmployeesQuery } from '@/app/redux/services/employeeApi';
import ActionButton from '@/components/buttons/action-button';
import {
  Form,
  FormControl,
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
  DepartmentFormSchema,
  DepartmentFormValues,
} from '@/lib/validation/department-form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import LoadingState from '../components/loading-state';

const NewDepartment = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(DepartmentFormSchema),
    defaultValues: {
      name: '',
      description: '',
      manager: '',
    },
  });

  const { data: employees, isLoading: isEmployeesLoading } =
    useGetEmployeesQuery();
  const { refetch: refetchDepartments } = useGetDepartmentsQuery();

  const [addDepartment] = useAddDepartmentMutation();

  const onSubmit = async (data: DepartmentFormValues) => {
    try {
      const response = await addDepartment(data);
      console.log(response);
      if ('data' in response) {
        dispatch(setDepartments(response.data));
        toast({
          title: 'Department Created',
          description: 'Department has been created successfully',
        });
        form.reset();
        refetchDepartments();
        router.push('/organization/departments');
        router.refresh();
      } else if ('error' in response) {
        toast({
          title: 'Error',
          description: 'An error occurred while creating the department',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'Something went wrong while creating the department',
        variant: 'destructive',
      });
    }
  };

  if (isEmployeesLoading) return <LoadingState />;
  return (
    <div className='bg-gray-50 p-5 mt-5 lg:w-[850px] rounded-lg'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-3'>
            <FormLabel>Department Name</FormLabel>
            <FormField
              name='name'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input
                      {...field}
                      className='text-sm text-gray-600 w-full'
                      placeholder='Enter department name'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='manager'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department Manager</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select an employee to display' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employees?.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel>Department Description</FormLabel>
            <FormField
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      className='text-sm text-gray-600'
                      placeholder='Enter description...'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='mt-5'>
              <ActionButton type='submit' label='Create Department' />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewDepartment;
