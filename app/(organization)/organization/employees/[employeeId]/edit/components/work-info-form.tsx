'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  WorkInfoFormSchema,
  WorkInfoFormValues,
} from '@/lib/validation/work-form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

interface WorkInfoFormProps {}

const WorkInfoForm: FC<WorkInfoFormProps> = ({}) => {
  const form = useForm<WorkInfoFormValues>({
    resolver: zodResolver(WorkInfoFormSchema),
    defaultValues: {
      workAddress: 'No 123, Galle Road, Colombo 03',
      workLocation: 'Remote',
      workingHours: 'Standard 40 hours/week',
      startDate: '2021-09-01',
      timeZone: 'Asia/Colombo',
    },
  });

  const onSubmit = (data: WorkInfoFormValues) => {
    // Perform save action here using data
    console.log(data);
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
          <Button type='submit' onClick={() => onSubmit}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default WorkInfoForm;
