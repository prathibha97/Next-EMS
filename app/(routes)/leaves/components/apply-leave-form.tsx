'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ChangeEvent, FC, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

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

import { useCreateLeaveRequestMutation } from '@/app/redux/services/leaveApi';
import ActionButton from '@/components/buttons/action-button';
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
import { Employee, LeaveBalance } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type EmployeeWithLeaveBalance = Employee & {
  leaveBalance: LeaveBalance;
};

interface ApplyLeaveFormProps {
  currentEmployee: Employee;
}

const ApplyLeaveForm: FC<ApplyLeaveFormProps> = ({ currentEmployee }) => {
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { startUpload } = useUploadThing('pdfUploader');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const employeeId = currentEmployee?.id || '';

  const [
    createLeaveRequest,
    { isLoading: leaveRequestLoading, error: leaveRequeestError },
  ] = useCreateLeaveRequestMutation();

  const form = useForm<LeaveFormValues>({
    resolver: zodResolver(LeaveFormSchema),
    defaultValues: {
      type: '',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
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
        startDate: new Date(values.startDate),
        endDate: new Date(values.endDate),
        reason: values.reason,
        medical: values.medical,
        otherProof: values.otherProof,
      }).unwrap();

      const leaveRequest = response;

      toast({
        title: 'Success',
        description: 'Leave request submitted successfully',
      });

      form.reset();
      router.refresh();

      await axios.post(`${process.env.NEXT_PUBLIC_URL}/email/leave`, {
        employeeId,
        ...values,
      });
    } catch (err) {
      setIsLoading(false);
      toast({
        title: 'Error',
        // @ts-ignore
        description: leaveRequeestError?.data || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
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
                  <div className='flex flex-col gap-y-2 mb-2 mt-6 w-full'>
                    <FormLabel>Start Date</FormLabel>

                    <FormField
                      control={form.control}
                      name='startDate'
                      render={({ field }) => (
                        <FormItem>
                          <Input type='date' {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='flex flex-col gap-y-2 mb-2 mt-6'>
                    <FormLabel>End Date</FormLabel>

                    <FormField
                      control={form.control}
                      name='endDate'
                      render={({ field }) => (
                        <FormItem>
                          <Input type='date' {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
  );
};

export default ApplyLeaveForm;
