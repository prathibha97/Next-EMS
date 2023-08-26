'use client';
import { useUpdateEmployeeMutation } from '@/app/redux/services/employeeApi';
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
  employeeId: string;
  employee: Employee | undefined;
}

const WorkInfoForm: FC<WorkInfoFormProps> = ({ employeeId, employee }) => {
  const form = useForm<WorkInfoFormValues>({
    resolver: zodResolver(WorkInfoFormSchema),
    defaultValues: {
      workAddress: employee?.workAddress ?? 'Work address not specified',
      workLocation: employee?.workLocation ?? 'Work location not specified',
      workingHours: employee?.workingHours ?? 'Working hours not specified',
      startDate: employee?.startDate ?? 'Starting date not specified',
      timeZone: employee?.timeZone ?? 'Time Zone is not specified',
    },
  });

  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();

  const onSubmit = (data: WorkInfoFormValues) => {
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
      const updatedEmployee = response;
      console.log(updatedEmployee);
      // dispatch(updateEmployeeData(updatedEmployee));
      toast({
        title: 'Employee updated successfully',
        description: 'Please update the rest of the employee information',
      });
      form.reset();
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
            <FormLabel>Work Address</FormLabel>
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
            <FormLabel>Work Location</FormLabel>
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
          </div>
        </div>
        <div className='mt-5'>
          <h2 className='text-lg font-semibold'>Schedule</h2>
          <Separator className='mt-1 mb-3' />
          <div className='flex flex-col gap-y-3'>
            <FormLabel>Start Date</FormLabel>
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
            <FormLabel>Working Hours</FormLabel>
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
            <FormLabel>Time Zone</FormLabel>
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
