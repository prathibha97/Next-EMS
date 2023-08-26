'use client';

import { Button } from '@/components/ui/button';
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
import { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useUploadThing } from '@/lib/uploadthing';
import { isBase64Image } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
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
  const { status } = useSession();
  if (status === 'unauthenticated') {
    router.push('/');
  }
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing('imageUploader');

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(EmployeeFormSchema),
    defaultValues: {
      name: 'Prathibha Ratnayake',
      position: 'Software Engineer',
      workMobile: '0771234567',
      personalMobile: '0771234567',
      workEmail: 'prathibha@sphiriaDigital.com',
      department: 'Software Engineering',
      jobPosition: 'Software Engineer',
      manager: 'Prathibha Ratnayake',
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
    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].fileUrl) {
        values.profile_photo = imgRes[0].fileUrl;
      }
    }
    // Perform save action here using data
    console.log(values);
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
            <Button type='submit' onClick={() => onSubmit}>
              Save
            </Button>
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
            <WorkInfoForm employeeId={params.employeeId} />
          </TabsContent>
          <TabsContent value='private'>
            <PrivateInfoForm employeeId={params.employeeId} />
          </TabsContent>
          <TabsContent value='HR'>
            <HRSettingsForm employeeId={params.employeeId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployeeEditPage;
