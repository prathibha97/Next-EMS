'use client';
import { DataTable } from '@/components/data-table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ChangeEvent, FC, useEffect, useState } from 'react';

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

import { useGetLoggedInEmployeeQuery } from '@/app/redux/services/employeeApi';
import {
  useCreateLeaveRequestMutation,
  useGetLeavesByEmployeeIdQuery,
} from '@/app/redux/services/leaveApi';
import ActionButton from '@/components/buttons/action-button';
import { DatePicker } from '@/components/inputs/date-picker';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { leaveTypes } from '@/constants/leaveTypes';
import { toast } from '@/hooks/use-toast';
import { useUploadThing } from '@/lib/uploadthing';
import {
  LeaveFormSchema,
  LeaveFormValues,
} from '@/lib/validation/leave-form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Leave } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { startUpload } = useUploadThing('pdfUploader');

  const { data: currentEmployee } = useGetLoggedInEmployeeQuery();

  const employeeId = currentEmployee?.id || '';
  const { data: leavesData, refetch: refetchLeaves } =
    useGetLeavesByEmployeeIdQuery({ employeeId });

  const [leaves, setLeaves] = useState<Leave[]>([]);

  const [
    createLeaveRequest,
    { isLoading: leaveRequestLoading, error: leaveRequeestError },
  ] = useCreateLeaveRequestMutation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (leavesData) {
      setLeaves(leavesData);
    }
  }, [leavesData]);

  useEffect(() => {
    refetchLeaves();
  }, []);

  const form = useForm<LeaveFormValues>({
    resolver: zodResolver(LeaveFormSchema),
    defaultValues: {
      type: '',
      startDate: new Date(),
      endDate: new Date(),
      reason: '',
      medical: '',
      otherProof: '',
    },
  });
  const handleFileUpload = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);

      const validFiles = newFiles.filter((file) => file.type.includes('pdf'));

      if (validFiles.length === 0) return; // No valid PDF files

      setFiles((prevFiles) => [...prevFiles, ...validFiles]);

      const fileDataUrls: string[] = [];

      validFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          const fileDataUrl = event.target?.result?.toString() || '';
          fileDataUrls.push(fileDataUrl);

          if (fileDataUrls.length === validFiles.length) {
            fieldChange(fileDataUrls.join(','));
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
  };

  const onSubmit = async (values: LeaveFormValues) => {
    setIsLoading(true);
    try {
      const hasFileChanged = files.length > 0;

      if (hasFileChanged) {
        const uploadRes = await startUpload(files);
        console.log(uploadRes);

        if (selectedLeaveType === 'medical') {
          if (uploadRes && uploadRes[0].url) {
            values.medical = uploadRes[0].url;
          }
        } else if (selectedLeaveType === 'special') {
          if (uploadRes && uploadRes[0].url) {
            values.otherProof = uploadRes[0].url;
          }
        }
      }

      const response = await createLeaveRequest({
        employeeId: employeeId,
        type: values.type,
        startDate: values.startDate,
        endDate: values.endDate,
        reason: values.reason,
        medical: values.medical,
        otherProof: values.otherProof,
      }).unwrap();

      const leaveRequest = response;
      console.log(leaveRequest);

      toast({
        title: 'Success',
        description: 'Leave request submitted successfully',
      });

      form.reset();
      refetchLeaves();
      router.refresh();
    } catch (err) {
      setIsLoading(false);
      toast({
        title: 'Error',
        description: leaveRequeestError?.data || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
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
                        <FormLabel>Leave Type</FormLabel>
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
                      <FormLabel>Start Date</FormLabel>
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
                      <FormLabel>End Date</FormLabel>
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
                            <Input
                              type='file'
                              accept='.pdf'
                              placeholder='Upload Medical'
                              onChange={(e) =>
                                handleFileUpload(e, field.onChange)
                              }
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {selectedLeaveType === 'special' && (
                    <div className='mb-2 mt-6'>
                      <FormField
                        control={form.control}
                        name='otherProof'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Upload Attachment</FormLabel>
                            <Input
                              type='file'
                              accept='.pdf'
                              placeholder='Upload Attachment'
                              onChange={(e) =>
                                handleFileUpload(e, field.onChange)
                              }
                            />
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
                    <ActionButton
                      className='bg-[#2ebdaa] w-20 text-center'
                      type='submit'
                      label='Submit'
                      isLoading={isLoading}
                    />
                  </div>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 mb-5'>
        <LeaveBalanceCard
          balance={currentEmployee?.leaveBalance?.annual}
          entitlement={currentEmployee?.employeeType === 'fullTime' ? 7 : 0}
          leaveType='Annual'
        />
        <LeaveBalanceCard
          balance={currentEmployee?.leaveBalance?.casual}
          entitlement={currentEmployee?.employeeType === 'fullTime' ? 7 : 1}
          leaveType='Casual'
        />
        <LeaveBalanceCard
          balance={currentEmployee?.leaveBalance?.medical}
          entitlement={currentEmployee?.employeeType === 'fullTime' ? 7 : 1}
          leaveType='Medical'
        />
        {currentEmployee?.employeeType === 'fullTime' &&
          currentEmployee?.leaveBalance?.broughtForward > 1 && (
            <LeaveBalanceCard
              balance={currentEmployee?.leaveBalance?.broughtForward}
              entitlement={currentEmployee?.employeeType === 'fullTime' ? 4 : 0}
              leaveType='Brought Forward'
            />
          )}
        {currentEmployee?.leaveBalance?.duty > 1 && (
          <LeaveBalanceCard
            balance={currentEmployee?.leaveBalance?.unpaid}
            entitlement={currentEmployee?.leaveBalance?.duty}
            leaveType='Unpaid'
          />
        )}
        {currentEmployee?.leaveBalance?.duty > 1 && (
          <LeaveBalanceCard
            balance={currentEmployee?.leaveBalance?.duty}
            entitlement={currentEmployee?.leaveBalance?.duty}
            leaveType='Duty'
          />
        )}
      </div>
      <DataTable
        columns={columns}
        data={leaves}
        placeholder='Date'
        searchFilter='createdAt'
      />
    </div>
  );
};

export default page;
