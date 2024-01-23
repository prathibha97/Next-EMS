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
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { setEmployee } from '@/app/redux/features/employeeSlice';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { useAddEmployeeMutation } from '@/app/redux/services/employeeApi';
import ActionButton from '@/components/buttons/action-button';
import { toast } from '@/hooks/use-toast';
import { useUploadThing } from '@/lib/uploadthing';
import { isBase64Image } from '@/lib/utils';
import { Department, Employee } from '@prisma/client';
import HRSettingsForm from './components/hr-settings-form';
import PrivateInfoForm from './components/private-info-form';
import WorkInfoForm from './components/work-info-form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetDepartmentsQuery } from '@/app/redux/services/departmentApi';
import LoadingState from './components/loading-state';
import { employeeTypeOptions } from '@/constants/employees';

const NewEmployeePage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { startUpload } = useUploadThing('imageUploader');

  const employee: Employee | null = useAppSelector(
    (state) => state.employee.employee
  );
  const dispatch = useAppDispatch();

  const [addEmployee, { isLoading }] = useAddEmployeeMutation();
  const { data: departments, isLoading: isDepartmentsLoading } =
    useGetDepartmentsQuery();

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
      // manager: '',
      profile_photo: '',
      employeeType: '',
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
    console.log(values);
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
        departmentId: values.department,
        jobPosition: values.jobPosition,
        name: values.name,
        personalMobile: values.personalMobile,
        position: values.position,
        profile_photo: values.profile_photo,
        workEmail: values.workEmail,
        workMobile: values.workMobile,
        employeeType: values.employeeType,
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

  if (isDepartmentsLoading) return <LoadingState />;

  return (
    <div className="w-full p-5">
      <div className="p-5 border rounded-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <div className="flex flex-col-reverse md:flex-row justify-between">
                <div className="flex flex-col">
                  <h1 className="text-3xl font-semibold">
                    <span>
                      <FormLabel>Name</FormLabel>

                      <FormField
                        name="name"
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
                  </h1>
                  <h1 className="text-3xl font-semibold">
                    <span>
                      <FormLabel>Position</FormLabel>

                      <FormField
                        name="position"
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
                  </h1>
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="profile_photo"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center gap-4">
                        <FormLabel>
                          {field.value ? (
                            <Image
                              src={field.value}
                              alt="profile photo"
                              width={100}
                              height={100}
                              priority
                              className="rounded-lg object-contain"
                            />
                          ) : (
                            <Image
                              src="/avatar.jpeg"
                              alt="profile photo"
                              width={100}
                              height={100}
                              className="object-contain"
                            />
                          )}
                        </FormLabel>
                        <FormControl className="text-base-semibold text-gray-400">
                          <Input
                            type="file"
                            accept="image/*"
                            placeholder="Upload image"
                            onChange={(e) => handleImage(e, field.onChange)}
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
            <div className="mt-5 flex flex-col md:flex-row justify-between">
              <div className="flex gap-4 flex-col">
                <span>
                  <FormLabel>Work Mobile</FormLabel>

                  <FormField
                    name="workMobile"
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
                  <FormLabel>Personal Mobile</FormLabel>

                  <FormField
                    name="personalMobile"
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
                  <FormLabel>Work Email</FormLabel>

                  <FormField
                    name="workEmail"
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
              <div className="flex flex-col gap-4 mt-5 md:mt-[68px] w-1/2">
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className=" bg-slate-50 w-[275px]">
                            <SelectValue placeholder="Select a department type to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments &&
                            departments.map((department: Department) => (
                              <SelectItem
                                key={department.id}
                                value={department.id}
                              >
                                {department.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="employeeType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-slate-50 w-[275px]">
                            <SelectValue placeholder="Select an employee type to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {employeeTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
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
            <div className="mt-4">
              <ActionButton
                type="submit"
                label="Create Employee"
                isLoading={isLoading || loading}
              />
            </div>
          </form>
        </Form>

        <Separator className="mt-3" />

        <div className="mt-8">
          <Tabs defaultValue="work" className="w-full">
            <TabsList className="flex flex-col md:grid w-full md:grid-cols-3 h-full">
              <TabsTrigger value="work">Work Information</TabsTrigger>
              <TabsTrigger value="private">Private Information</TabsTrigger>
              <TabsTrigger value="HR">HR Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="work">
              <WorkInfoForm employee={employee} />
            </TabsContent>
            <TabsContent value="private">
              <PrivateInfoForm employee={employee} />
            </TabsContent>
            <TabsContent value="HR">
              <HRSettingsForm employee={employee} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default NewEmployeePage;
