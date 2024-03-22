'use client';
import { setDepartments } from '@/app/redux/features/departmentSlice';
import { useAppDispatch } from '@/app/redux/hooks';
import {
  useAddDepartmentMutation,
  useGetDepartmentsQuery,
  useUpdateDepartmentMutation,
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
import { Department } from '@prisma/client';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import LoadingState from '../../components/loading-state';

interface DepartmentEditPageProps {
  params: {
    departmentId: string;
  };
}

const DepartmentEditPage: FC<DepartmentEditPageProps> = ({ params }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const urlParams = useParams();
  const [department, setDepartment] = useState<Department>();
  const [loading, setLoading] = useState(false)
  console.log('🚀 ~ department:', department);

  useEffect(() => {
    const fetchDepartment = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/departments/${urlParams?.departmentId}`
        );
        setDepartment(data);
      } catch (error) {
        console.log(error)
      }finally{
      setLoading(false);
      }
    };
    fetchDepartment();
  }, []);

  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(DepartmentFormSchema),
    defaultValues: {
      name: department && department?.name,
      description: (department && department?.description) as string,
      manager: (department && department?.managerId) as string,
    },
  });

  const { data: employees, isLoading: isEmployeesLoading } =
    useGetEmployeesQuery();
  const { refetch: refetchDepartments } = useGetDepartmentsQuery();

  const [updateDepartment] = useUpdateDepartmentMutation();

  const onSubmit = async (data: DepartmentFormValues) => {
    try {
      const response = await updateDepartment({
        departmentId:urlParams?.departmentId as string,
        body:data
      });
      if ('data' in response) {
        dispatch(setDepartments(response.data));
        toast({
          title: 'Department updated',
          description: 'Department has been updated successfully',
        });
        form.reset();
        refetchDepartments();
        router.push('/organization/departments');
        router.refresh();
      } else if ('error' in response) {
        toast({
          title: 'Error',
          description: 'An error occurred while updating the department',
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

  if (isEmployeesLoading || loading) return <LoadingState />;
  return (
    <div className=' p-5 mt-5 lg:w-full rounded-lg'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-3'>
            <FormLabel>Department Name</FormLabel>
            <FormField
              name='name'
              defaultValue={department?.name}
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
              defaultValue={department?.description}
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
              <ActionButton type='submit' label='Update Department' />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DepartmentEditPage;
