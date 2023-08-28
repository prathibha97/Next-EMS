'use client';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  EmployeeFormSchema,
  EmployeeFormValues,
} from '@/lib/validation/employee-form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
} from '@/app/redux/services/employeeApi';
import ActionButton from '@/components/buttons/action-button';
import { toast } from '@/hooks/use-toast';
import { useUploadThing } from '@/lib/uploadthing';
import { isBase64Image } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoadingState from '../components/loading-state';
import HRSettingsForm from './components/hr-settings-form';
import PrivateInfoForm from './components/private-info-form';
import WorkInfoForm from './components/work-info-form';

interface EmployeeEditPageProps {
  params: {
    employeeId: string;
  };
}

const EmployeeEditPage: FC<EmployeeEditPageProps> = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/');
    },
  });
  useEffect(() => {
    if (session && session?.user?.role !== 'ADMIN') {
      router.push('/denied');
    }
  }, [session]);
  
  const employeeId = params.employeeId;
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { startUpload } = useUploadThing('imageUploader');

  const {
    data: employee,
    isLoading: isLoadingEmployee,
    isFetching,
    refetch: refetchEmployee,
  } = useGetEmployeeByIdQuery({ employeeId: params.employeeId });

  const [updateEmployee, { isLoading: loading }] = useUpdateEmployeeMutation();

  if (isLoadingEmployee || isFetching) return <LoadingState />;

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(EmployeeFormSchema),
    defaultValues: {
      name: employee?.name,
      position: employee?.position,
      workMobile: employee?.workMobile,
      personalMobile: employee?.personalMobile,
      workEmail: employee?.workEmail,
      department: employee?.department,
      jobPosition: employee?.jobPosition,
      manager: employee?.manager,
      profile_photo: employee?.profile_photo,
    },
  });

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes('image')) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || '';
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: EmployeeFormValues) => {
    setIsLoading(true);
    try {
      const blob = values.profile_photo;

      const hasImageChanged = isBase64Image(blob);

      if (hasImageChanged) {
        const imgRes = await startUpload(files);

        if (imgRes && imgRes[0].fileUrl) {
          values.profile_photo = imgRes[0].fileUrl;
        }
      }
      setIsLoading(false);

      const response = await updateEmployee({
        employeeId, // Pass the employeeId to the mutation
        body: {
          name: values.name,
          position: values.position,
          workMobile: values.workMobile,
          personalMobile: values.personalMobile,
          workEmail: values.workEmail,
          department: values.department,
          jobPosition: values.jobPosition,
          manager: values.manager,
          profile_photo: values.profile_photo,
        },
      });
      // const updatedEmployee = response?.data;
      // console.log(updatedEmployee);
      // dispatch(updateEmployeeData(updatedEmployee));
      toast({
        title: 'Employee updated successfully',
        description: 'Please update the rest of the employee information',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, Please try again',
        variant: 'destructive',
      });
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-slate-50 w-[850px] xl:[3000px] p-3'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <h1 className='text-3xl font-semibold'>
                  <FormField
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            className='text-3xl text-gray-600'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </h1>
                <h2 className='mt-3 text-xl text-gray-600'>
                  <FormField
                    name='position'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} className='text-xl text-gray-600' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </h2>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name='profile_photo'
                  render={({ field }) => (
                    <FormItem className='flex items-center gap-4'>
                      <FormLabel>
                        {field.value ? (
                          <Image
                            src={field.value}
                            alt='profile photo'
                            width={80}
                            height={80}
                            priority
                            className='rounded-lg object-contain'
                          />
                        ) : (
                          <Image
                            src='/assets/profile.svg'
                            alt='profile photo'
                            width={24}
                            height={24}
                            className='object-contain'
                          />
                        )}
                      </FormLabel>
                      <FormControl className='text-base-semibold text-gray-400'>
                        <Input
                          type='file'
                          accept='image/*'
                          placeholder='Upload image'
                          onChange={(e) => handleImage(e, field.onChange)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className='mt-5 flex justify-between'>
            <div className='flex flex-col gap-y-2 w-1/2'>
              <FormLabel>Work Mobile</FormLabel>
              <FormField
                name='workMobile'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} className='text-sm text-gray-600' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormLabel>Personal Mobile</FormLabel>
              <FormField
                name='personalMobile'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} className='text-sm text-gray-600' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormLabel>Work Email</FormLabel>
              <FormField
                name='workEmail'
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
            <div className='flex flex-col gap-y-2 w-1/3'>
              <FormLabel>Department</FormLabel>
              <FormField
                name='department'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} className='text-sm text-gray-600' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormLabel>Job Position</FormLabel>
              <FormField
                name='jobPosition'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} className='text-sm text-gray-600' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormLabel>Manager</FormLabel>
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
            </div>
          </div>
          <div className='mt-4'>
            <ActionButton
              isLoading={isLoading || loading}
              type='submit'
              label='Save'
            />
          </div>
        </form>
      </Form>

      <Separator className='mt-3' />

      <div className='mt-8'>
        <Tabs defaultValue='work' className='w-full'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='work'>Work Information</TabsTrigger>
            <TabsTrigger value='private'>Private Information</TabsTrigger>
            <TabsTrigger value='HR'>HR Settings</TabsTrigger>
          </TabsList>
          <TabsContent value='work'>
            <WorkInfoForm employeeId={params.employeeId} employee={employee} />
          </TabsContent>
          <TabsContent value='private'>
            <PrivateInfoForm
              employeeId={params.employeeId}
              employee={employee}
            />
          </TabsContent>
          <TabsContent value='HR'>
            <HRSettingsForm
              employeeId={params.employeeId}
              employee={employee}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployeeEditPage;
