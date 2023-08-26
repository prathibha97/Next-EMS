'use client';
import { updateEmployeeData } from '@/app/redux/features/employeeSlice';
import { useAppDispatch } from '@/app/redux/hooks';
import { useUpdateEmployeeMutation } from '@/app/redux/services/employeeApi';
import ActionButton from '@/components/buttons/action-button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import {
  WorkInfoFormSchema,
  WorkInfoFormValues,
} from '@/lib/validation/work-form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Employee } from '@prisma/client';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

interface WorkInfoFormProps {
  employee: Employee;
}

const WorkInfoForm: FC<WorkInfoFormProps> = ({ employee }) => {
  const employeeId = '64e8c258664a84d2d663da2a' || employee?.id ;
  console.log(employeeId);
  const dispatch = useAppDispatch();
  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();
  const form = useForm<WorkInfoFormValues>({
    resolver: zodResolver(WorkInfoFormSchema),
    defaultValues: {
      workAddress: '123, Main Street, Colombo 01',
      workLocation: 'Remote',
      workingHours: 'Standard 40 hours/week',
      startDate: '',
      timeZone: 'Asia/Colombo',
    },
  });

  const onSubmit = (data: WorkInfoFormValues) => {
    console.log(data);
    try {
      const response = updateEmployee({
        employeeId, // Pass the employeeId to the mutation
        body: {
          workAddress: data.workAddress,
          workLocation: data.workLocation,
          workingHours: data.workingHours,
          startDate: data.startDate,
          timeZone: data.timeZone,
        },
      });
      console.log(response);
      if ('data' in response) {
        const updatedEmployee = response.data; // Access the nested data
        // dispatch(updateEmployeeData(updatedEmployee));

        toast({
          title: 'Employee updated successfully',
          description: 'Please update the rest of the employee information',
        });
        form.reset();
      } else if ('error' in response) {
        toast({
          title: 'Error',
          description: 'Something went wrong, Please try again',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, Please try again',
        variant: 'destructive',
      });
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='mt-5'>
          <h2 className='text-lg font-semibold'>Location</h2>
          <Separator className='mt-1 mb-3' />

          <div className='flex flex-col gap-y-3'>
            <span>
              Work Address :{' '}
              <FormField
                name='workAddress'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} className='text-sm text-gray-600' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </span>
            <span>
              Work Location :{' '}
              <FormField
                name='workLocation'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} className='text-sm text-gray-600' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </span>
          </div>
        </div>
        <div className='mt-5'>
          <h2 className='text-lg font-semibold'>Schedule</h2>
          <Separator className='mt-1 mb-3' />
          <div className='flex flex-col gap-y-3'>
            <span>
              Start Date :{' '}
              <FormField
                name='startDate'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} className='text-sm text-gray-600' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </span>
            <span>
              Working hours :{' '}
              <FormField
                name='workingHours'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} className='text-sm text-gray-600' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </span>
            <span>
              TimeZone :{' '}
              <FormField
                name='timeZone'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} className='text-sm text-gray-600' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </span>
          </div>
        </div>
        <div className='mt-4'>
          <ActionButton
            type='submit'
            onClick={() => onSubmit}
            isLoading={isLoading}
            label='Save'
          />
        </div>
      </form>
    </Form>
  );
};

export default WorkInfoForm;
