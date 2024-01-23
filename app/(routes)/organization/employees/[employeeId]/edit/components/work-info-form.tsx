'use client';
import { useUpdateEmployeeMutation } from '@/app/redux/services/employeeApi';
import ActionButton from '@/components/buttons/action-button';
import { DatePicker } from '@/components/inputs/date-picker';
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
import { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface WorkInfoFormProps {
  employeeId: string;
  employee: Employee | undefined;
  refetchEmployees: () => void;
}

const WorkInfoForm: FC<WorkInfoFormProps> = ({
  employeeId,
  employee,
  refetchEmployees,
}) => {
  const form = useForm<WorkInfoFormValues>({
    resolver: zodResolver(WorkInfoFormSchema),
    defaultValues: {
      workAddress: employee?.workAddress ?? 'Work address not specified',
      workLocation: employee?.workLocation ?? 'Work location not specified',
      workingHours: employee?.workingHours ?? 'Working hours not specified',
      startDate:
        new Date(employee?.startDate as Date) ?? 'Start date not specified',
      timeZone: employee?.timeZone ?? 'Time Zone is not specified',
    },
  });

  console.log(employee);

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
        <div className="mt-5">
          <h2 className="text-lg font-semibold">Location</h2>
          <Separator className="mt-1 mb-3" />

          <div className="flex flex-col md:flex-row justify-between gap-y-3">
            <span>
              <FormLabel>Work Address</FormLabel>

              <FormField
                name="workAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="text-sm text-gray-600 bg-slate-50 w-full md:w-[500px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </span>
            <span>
              <FormLabel>Work Location</FormLabel>

              <FormField
                name="workLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="text-sm text-gray-600 bg-slate-50 w-full md:w-[500px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </span>
          </div>
        </div>

        <div className="mt-5">
          <h2 className="text-lg font-semibold">Schedule</h2>
          <Separator className="mt-1 mb-3" />

          <div className="flex flex-col md:flex-row justify-between gap-4">
            <span>
              <FormLabel>Start Date</FormLabel>

              <Controller
                name="startDate"
                control={form.control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                  />
                )}
              />
            </span>

            <span>
              <FormLabel>Working hours</FormLabel>

              <FormField
                name="workingHours"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="text-sm text-gray-600 bg-slate-50 w-full md:w-[400px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </span>
            <span>
              <FormLabel>TimeZone</FormLabel>

              <FormField
                name="timeZone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="text-sm text-gray-600 bg-slate-50 w-full md:w-[400px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </span>
          </div>
        </div>
        <div className="mt-4">
          <ActionButton
            type="submit"
            onClick={() => onSubmit}
            isLoading={isLoading}
            label="Save"
          />
        </div>
      </form>
    </Form>
  );
};

export default WorkInfoForm;
