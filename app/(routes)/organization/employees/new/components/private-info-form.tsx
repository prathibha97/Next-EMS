import { updateEmployeeData } from '@/app/redux/features/employeeSlice';
import { useAppDispatch } from '@/app/redux/hooks';
import { useUpdateEmployeeMutation } from '@/app/redux/services/employeeApi';
import ActionButton from '@/components/buttons/action-button';
import { DatePicker } from '@/components/inputs/date-picker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import {
  PrivateInfoFormSchema,
  PrivateInfoFormValues,
} from '@/lib/validation/private-info-forn-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Employee } from '@prisma/client';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface PrivateInfoFormProps {
  employee: Employee | null;
}

const PrivateInfoForm: FC<PrivateInfoFormProps> = ({ employee }) => {
  const dispatch = useAppDispatch();

  const employeeId = employee?.id;

  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();

  const form = useForm<PrivateInfoFormValues>({
    resolver: zodResolver(PrivateInfoFormSchema),
    defaultValues: {
      privateAddress: '',
      personalEmail: '',
      phone: '',
      bankAccountNumber: '',
      bankName: '',
      maritalStatus: '',
      numberOfDependents: 0,
      emergencyContactName: '',
      emergencyContactPhone: '',
      nationality: '',
      idNumber: '',
      gender: '',
      dateOfBirth: new Date(),
    },
  });

  const onSubmit = (data: PrivateInfoFormValues) => {
    try {
      const response = updateEmployee({
        employeeId, // Pass the employeeId to the mutation
        body: {
          privateAddress: data.privateAddress,
          personalEmail: data.personalEmail,
          phone: data.phone,
          bankAccountNumber: data.bankAccountNumber,
          bankName: data.bankName,
          maritalStatus: data.maritalStatus,
          numberOfDependents: data.numberOfDependents,
          emergencyContactName: data.emergencyContactName,
          emergencyContactPhone: data.emergencyContactPhone,
          nationality:data.nationality,
          idNumber:data.idNumber,
          gender:data.gender,
          dateOfBirth:data.dateOfBirth,
        },
      });
        const updatedEmployee = response; // Access the nested data
        console.log(updatedEmployee);
        // dispatch(updateEmployeeData(updatedEmployee));

        toast({
          title: 'Employee updated successfully',
          description: 'Please update the rest of the employee information',
        });
        form.reset();

    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, Please try again',
        variant: 'destructive',
      });
      console.log(error);
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex justify-between'>
            {/* Private Contact */}
            <div className='w-1/2'>
              <h2 className='text-lg font-semibold'>Private Contact</h2>
              <Separator className='mt-1 mb-3' />
              <div className='flex flex-col gap-y-4'>
                <div className='flex flex-col gap-x-2'>
                  <span>Private Address: </span>
                  <FormField
                    name='privateAddress'
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
                <span>
                  Personal Email :{' '}
                  <FormField
                    name='personalEmail'
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
                  Phone :{' '}
                  <FormField
                    name='phone'
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
                  Bank Name :{' '}
                  <FormField
                    name='bankName'
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
                  Bank Account Number :{' '}
                  <FormField
                    name='bankAccountNumber'
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

            {/* Family Status */}
            <div className='w-1/3'>
              <h2 className='text-lg font-semibold'>Family Status</h2>
              <Separator className='mt-1 mb-3' />
              <div className='flex flex-col gap-y-4'>
                <span>
                  Marital Status :{' '}
                  <FormField
                    name='maritalStatus'
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
                  Number of dependent children :{' '}
                  <FormField
                    name='numberOfDependents'
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
          </div>

          {/* Emergency contacts */}
          <div className='flex justify-between mt-5'>
            <div className='w-1/2'>
              <h2 className='text-lg font-semibold'>Emergency Contact</h2>
              <Separator className='mt-1 mb-3' />
              <div className='flex flex-col gap-y-4'>
                <span>
                  Contact Name :{' '}
                  <FormField
                    name='emergencyContactName'
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
                  Contact Number :{' '}
                  <FormField
                    name='emergencyContactPhone'
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

            {/* Citizenship*/}

            <div>
              <h2 className='text-lg font-semibold'>Citizenship</h2>
              <Separator className='mt-1 mb-3' />
              <div className='flex flex-col gap-y-4'>
                <span>
                  Nationality :{' '}
                  <FormField
                    name='nationality'
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
                  Identification Number :{' '}
                  <FormField
                    name='idNumber'
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
                  Gender :{' '}
                  <FormField
                    name='gender'
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
                  Date of Birth :{' '}
                  <Controller
                    name='dateOfBirth'
                    control={form.control}
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onChange={(date) => field.onChange(date)}
                      />
                    )}
                  />
                </span>
              </div>
            </div>
          </div>
          <div className='mt-4'>
            <ActionButton
              type='submit'
              onClick={() => onSubmit}
              isLoading={isLoading}
              label='Save'
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default PrivateInfoForm;
