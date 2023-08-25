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

import ActionButton from '@/components/buttons/action-button';
import { toast } from '@/hooks/use-toast';
import { useUploadThing } from '@/lib/uploadthing';
import { isBase64Image } from '@/lib/utils';
import axios from 'axios';
import HRSettingsForm from './components/hr-settings-form';
import PrivateInfoForm from './components/private-info-form';
import WorkInfoForm from './components/work-info-form';

const NewEmployeePage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { startUpload } = useUploadThing('imageUploader');

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
      const {
        department,
        jobPosition,
        manager,
        name,
        personalMobile,
        position,
        profile_photo,
        workEmail,
        workMobile,
      } = values;
      // Perform save action here using data
      await axios.post('/api/employees', {
        department,
        jobPosition,
        manager,
        name,
        personalMobile,
        position,
        profile_photo,
        workEmail,
        workMobile,
      });
      setIsLoading(false);
      toast({
        title: 'Employee created successfully',
        description:
          'Please update the rest of the employee information',
      });
      form.reset();
    } catch (error) {
      setIsLoading(false);
      toast({
        title: 'Error',
        description: 'Something went wrong, Please try again',
        variant: 'destructive',
      });
      console.log(error);
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
            <div className='flex flex-col'>
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
            <div className='flex flex-col'>
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
              isLoading={isLoading}
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
            <WorkInfoForm />
          </TabsContent>
          <TabsContent value='private'>
            <PrivateInfoForm />
          </TabsContent>
          <TabsContent value='HR'>
            <HRSettingsForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NewEmployeePage;
