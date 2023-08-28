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
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import { setEmployee } from '@/app/redux/features/employeeSlice';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { useAddEmployeeMutation } from '@/app/redux/services/employeeApi';
import ActionButton from '@/components/buttons/action-button';
import { toast } from '@/hooks/use-toast';
import { useUploadThing } from '@/lib/uploadthing';
import { isBase64Image } from '@/lib/utils';
import { Employee } from '@prisma/client';
import HRSettingsForm from './components/hr-settings-form';
import PrivateInfoForm from './components/private-info-form';
import WorkInfoForm from './components/work-info-form';

const NewEmployeePage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { startUpload } = useUploadThing('imageUploader');

  const employee: Employee | null = useAppSelector(
    (state) => state.employeeReducer.employee
  );
  const dispatch = useAppDispatch();

  const [addEmployee, { isLoading }] = useAddEmployeeMutation();

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(EmployeeFormSchema),
    defaultValues: {
      name: '',
      position: '',
      workMobile: '',
      personalMobile: '',
      workEmail: '',
      department: '',
      jobPosition: '',
      manager: '',
      profile_photo: '',
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
    setLoading(true);
    try {
      const blob = values.profile_photo;

      const hasImageChanged = isBase64Image(blob);

      if (hasImageChanged) {
        const imgRes = await startUpload(files);

        if (imgRes && imgRes[0].fileUrl) {
          values.profile_photo = imgRes[0].fileUrl;
        }
      }
      setLoading(false);

      const response = await addEmployee({
        department: values.department,
        jobPosition: values.jobPosition,
        manager: values.manager,
        name: values.name,
        personalMobile: values.personalMobile,
        position: values.position,
        profile_photo: values.profile_photo,
        workEmail: values.workEmail,
        workMobile: values.workMobile,
      });
      if ('data' in response) {
        const newEmployee = response.data; // Access the nested data
        dispatch(setEmployee(newEmployee));

        toast({
          title: 'Employee created successfully',
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
      setLoading(false);
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
                            placeholder='Name'
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
                          <Input
                            {...field}
                            className='text-xl text-gray-600'
                            placeholder='Position'
                          />
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
            <div className='flex flex-col w-1/3'>
              <span>
                Work Mobile:{' '}
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
              </span>
              <span>
                Personal Mobile:{' '}
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
              </span>
              <span>
                Work Email:{' '}
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
              </span>
            </div>
            <div className='flex flex-col w-1/2'>
              <span>
                Department:{' '}
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
              </span>
              <span>
                Job Position:{' '}
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
              </span>
              <span>
                Manager:
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
              </span>
            </div>
          </div>
          <div className='mt-4'>
            <ActionButton
              type='submit'
              label='Create Employee'
              isLoading={isLoading || loading}
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
            <WorkInfoForm employee={employee} />
          </TabsContent>
          <TabsContent value='private'>
            <PrivateInfoForm employee={employee} />
          </TabsContent>
          <TabsContent value='HR'>
            <HRSettingsForm employee={employee} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NewEmployeePage;
