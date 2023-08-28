'use client';
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
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import {
  DepartmentFormSchema,
  DepartmentFormValues,
} from '@/lib/validation/department-form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const NewDepartment = () => {
  const router = useRouter();
  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(DepartmentFormSchema),
    defaultValues: {
      name: '',
      description: '',
      manager: '',
      parentDepartment: '',
    },
  });

  const onSubmit = (data: DepartmentFormValues) => {
    console.log(data);
    try {
      toast({
        title: 'Department Created',
        description: 'Department has been created successfully',
      })
      form.reset();
      router.push('/organization/departments');
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'An error occurred while creating the department',
        variant: 'destructive'
      })
    }
  };
  return (
    <div className='bg-gray-50 p-5 mt-5 lg:w-[850px] rounded-lg'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-3'>
            <FormLabel>Department Name</FormLabel>
            <FormField
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} className='text-sm text-gray-600' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel>Department Manager</FormLabel>
            <FormField
              name='manager'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} className='text-sm text-gray-600' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel>Parent Department</FormLabel>
            <FormField
              name='parentDepartment'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} className='text-sm text-gray-600' />
                  </FormControl>
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
                    <Textarea {...field} className='text-sm text-gray-600' />
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
