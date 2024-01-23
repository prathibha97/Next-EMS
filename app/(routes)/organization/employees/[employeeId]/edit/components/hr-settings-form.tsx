'use client';
import { useUpdateEmployeeMutation } from '@/app/redux/services/employeeApi';
import { useGetUsersQuery } from '@/app/redux/services/userApi';
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
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { useUploadThing } from '@/lib/uploadthing';
import {
  HRSettingsFormSchema,
  HRSettingsFormValues,
} from '@/lib/validation/hr-settings-form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Employee } from '@prisma/client';
import { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import LoadingState from '../../components/loading-state';

interface HRSettingsFormProps {
  employeeId: string;
  employee: Employee | undefined;
}

const HRSettingsForm: FC<HRSettingsFormProps> = ({ employeeId, employee }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { startUpload } = useUploadThing('pdfUploader');

  const { data: users, isLoading: isUsersLoading } = useGetUsersQuery();
  const [updateEmployee, { isLoading: loading }] = useUpdateEmployeeMutation();

  const form = useForm<HRSettingsFormValues>({
    resolver: zodResolver(HRSettingsFormSchema),
    defaultValues: {
      employeeNumber: employee?.employeeNumber ?? 'Employee number not set',
      userId:
        employee?.userId ?? 'No user account associated with the employee',
      idCopy: employee?.idCopy ?? 'ID copy not uploaded',
      resumeCopy: employee?.resumeCopy ?? 'Resume not uploaded',
      passbookCopy: employee?.passbookCopy ?? 'Passbook copy not uploaded',
      basicSalary: employee?.basicSalary?.toString() ?? 'Basic salary not set',
      performanceAllowance:
        employee?.performanceAllowance?.toString() ??
        'Performance allowance not set',
      mobileAllowance:
        employee?.mobileAllowance?.toString() ?? 'Mobile allowance not set',
      dataAllowance:
        employee?.dataAllowance?.toString() ?? 'Data allowance not set',
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

  const onSubmit = async (values: HRSettingsFormValues) => {
    // Perform save action here using data
    setIsLoading(true);
    try {
      const hasFileChanged = files.length > 0;

      if (hasFileChanged) {
        const uploadRes = await startUpload(files);
        console.log(uploadRes);
        if (uploadRes && uploadRes[0].url) {
          values.idCopy = uploadRes[0].url;
        }
        if (uploadRes && uploadRes[1].url) {
          values.resumeCopy = uploadRes[1].url;
        }
        if (uploadRes && uploadRes[2].url) {
          values.passbookCopy = uploadRes[2].url;
        }
      }
      setIsLoading(false);
      const response = updateEmployee({
        employeeId,
        body: {
          employeeNumber: values.employeeNumber,
          userId: values.userId,
          idCopy: values.idCopy,
          resumeCopy: values.resumeCopy,
          passbookCopy: values.passbookCopy,
          basicSalary: parseFloat(values.basicSalary),
          performanceAllowance: parseFloat(values.performanceAllowance),
          mobileAllowance: parseFloat(values.mobileAllowance),
          dataAllowance: parseFloat(values.dataAllowance),
        },
      }).unwrap();
      const updatedEmployee = response; // Access the nested data
      console.log(updatedEmployee);
      toast({
        title: 'Success',
        description: 'Employee details updated successfully',
      });
      form.reset();
    } catch (error) {
      setIsLoading(false);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      });
    }
  };

  if (isUsersLoading) return <LoadingState />;
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between">
            {/* Status */}
            <div className="w-1/2">
              <h2 className="text-lg font-semibold">Status</h2>
              <Separator className="mt-1 mb-3" />
              <div className="flex flex-col gap-y-4">
                <FormField
                  control={form.control}
                  name="employeeNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee Number</FormLabel>
                      <Input
                        {...field}
                        className="text-sm text-gray-600 bg-slate-50 w-full md:w-[500px]"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Related User</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className=" bg-slate-50 w-full md:w-[500px]">
                            <SelectValue placeholder="Select an user email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {users?.map((user: User) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.email}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">Upload Documents</h2>
              <Separator className="mt-1 mb-3" />
              <div className="flex gap-4 flex-col">
                <FormLabel>NIC Copy</FormLabel>
                <FormField
                  control={form.control}
                  name="idCopy"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormControl className="text-base-semibold text-gray-400">
                        <Input
                          type="file"
                          accept=".pdf"
                          placeholder="Upload ID Card"
                          onChange={(e) => handleFileUpload(e, field.onChange)}
                          className="w-full bg-slate-50 md:w-[300px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormLabel>Resume Copy</FormLabel>
                <FormField
                  control={form.control}
                  name="resumeCopy"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormControl className="text-base-semibold text-gray-400">
                        <Input
                          type="file"
                          accept=".pdf"
                          placeholder="Upload Resume"
                          onChange={(e) => handleFileUpload(e, field.onChange)}
                          className="w-full bg-slate-50 md:w-[300px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormLabel>Passbook Copy</FormLabel>
                <FormField
                  control={form.control}
                  name="passbookCopy"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormControl className="text-base-semibold text-gray-400">
                        <Input
                          type="file"
                          accept=".pdf"
                          placeholder="Upload Bank Passbook"
                          onChange={(e) => handleFileUpload(e, field.onChange)}
                          className="w-full bg-slate-50 md:w-[300px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h2 className="text-lg font-semibold">Salary Information</h2>
            <Separator className="mt-1 mb-3" />
            <div className="flex justify-between space-x-5">
              <div className="w-1/2 space-y-3">
                <FormField
                  control={form.control}
                  name="basicSalary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Basic Salary</FormLabel>
                      <Input
                        {...field}
                        placeholder="Enter Basic Salary Amount"
                        type="text"
                        className="text-sm text-gray-600 bg-slate-50 w-full md:w-[500px]"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="performanceAllowance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Performance Allowance</FormLabel>
                      <Input
                        {...field}
                        placeholder="Enter Performance Allowance Amount"
                        type="text"
                        className="text-sm text-gray-600 bg-slate-50 w-full md:w-[500px]"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2 space-y-3">
                <FormField
                  control={form.control}
                  name="mobileAllowance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Allowance</FormLabel>
                      <Input
                        {...field}
                        placeholder="Enter Mobile Allowance Amount"
                        type="text"
                        className="text-sm text-gray-600 bg-slate-50 w-full md:w-[500px]"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dataAllowance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data Allowance</FormLabel>
                      <Input
                        {...field}
                        placeholder="Enter Data Allowance Amount"
                        type="text"
                        className="text-sm text-gray-600 bg-slate-50 w-full md:w-[500px]"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h2 className="text-lg font-semibold">Leave Allocation</h2>
            <Separator className="mt-1 mb-3" />
            <div className="flex justify-between space-x-5">
              <div className="w-1/2 space-y-3">
                <FormField
                  control={form.control}
                  name="medicalLeaves"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medical Leaves</FormLabel>
                      <Input
                        {...field}
                        placeholder="Enter Number of Medical Leaves"
                        type="text"
                        className="text-sm text-gray-600 bg-slate-50 w-full md:w-[500px]"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="casualLeaves"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Casual Leaves</FormLabel>
                      <Input
                        {...field}
                        placeholder="Enter Number of Casual Leaves"
                        type="text"
                        className="text-sm text-gray-600 bg-slate-50 w-full md:w-[500px]"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <ActionButton
              isLoading={isLoading || loading}
              type="submit"
              onClick={() => onSubmit}
              label="Save"
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default HRSettingsForm;
