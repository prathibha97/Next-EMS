'use client';
import { DataTable } from '@/components/data-table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { leaveBalanceData } from '@/constants/sample/leave-balance-data';
import { leaveData } from '@/constants/sample/leave-data';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { columns } from './components/columns';
import LeaveBalanceCard from './components/leave-balance-card';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { DatePicker } from '@/components/inputs/date-picker';
import { Textarea } from '@/components/ui/textarea';
import { leaveTypes } from '@/constants/leaveTypes';
import { HRSettingsFormSchema } from '@/lib/validation/hr-settings-form-validation';
import { LeaveFormSchema, LeaveFormValues } from '@/lib/validation/leave-form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/');
    },
  });

  const form = useForm<LeaveFormValues>({
    resolver: zodResolver(LeaveFormSchema),
    defaultValues: {
      type: '',
      startDate: new Date(),
      endDate: new Date(),
      reason: '',
    },
  });

  const onSubmit = (values: LeaveFormValues) => {
    console.log(values);
    try {
      toast({
        title: 'Success',
        description: 'Leave request submitted successfully',
      });
      form.reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      });
    }
  };

  if (!isMounted) return null;

  return (
    <div>
      <div className='mb-5'>
        <Dialog>
          <DialogTrigger>
            <Button className='bg-[#2ebdaa]'>Apply Leave</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='mx-48 pt-10 text-xl'>
                Add New Leave Request
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='px-8 mb-4'>
                  <FormField
                    control={form.control}
                    name='type'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employee Type</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            setSelectedLeaveType(value);
                            field.onChange(value);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select a leave type to display' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {leaveTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='flex gap-x-2'>
                    <div className='flex flex-col gap-y-2 mb-2 mt-6'>
                      <FormLabel>From Date</FormLabel>
                      <Controller
                        name='startDate'
                        control={form.control}
                        render={({ field }) => (
                          <DatePicker
                            value={field.value}
                            onChange={(date) => field.onChange(date)}
                          />
                        )}
                      />
                    </div>
                    <div className='flex flex-col gap-y-2 mb-2 mt-6'>
                      <FormLabel>To Date</FormLabel>
                      <Controller
                        name='endDate'
                        control={form.control}
                        render={({ field }) => (
                          <DatePicker
                            value={field.value}
                            onChange={(date) => field.onChange(date)}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className='flex justify-between mb-2 mt-6'>
                    <div className='text-sm text-gray-500'>
                      Duration in Days:
                    </div>
                    <div className='text-sm text-gray-500'>
                      Remaining leaves:
                    </div>
                  </div>
                  {selectedLeaveType === 'medical' && (
                    <div className='mb-2 mt-6'>
                      <FormField
                        control={form.control}
                        name='medical'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Upload Medical</FormLabel>
                            <Input {...field} type='file' />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <div className='mb-2 mt-6'>
                    <FormField
                      control={form.control}
                      name='reason'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reason for leave</FormLabel>
                          <Textarea
                            {...field}
                            placeholder='Enter reason for the leave request'
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='mx-auto mb-4'>
                    <Button
                      className='bg-[#2ebdaa] w-20 text-center'
                      type='submit'
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 mb-5'>
        {leaveBalanceData.map((leaveBalance) => (
          <LeaveBalanceCard
            key={leaveBalance.id}
            balance={leaveBalance.balance}
            entitlement={leaveBalance.entitlement}
            leaveType={leaveBalance.leaveType}
          />
        ))}
      </div>
      <DataTable
        columns={columns}
        data={leaveData}
        placeholder='Date'
        searchFilter='requestDate'
      />
    </div>
  );
};

export default page;
