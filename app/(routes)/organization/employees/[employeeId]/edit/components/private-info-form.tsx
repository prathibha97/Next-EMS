import { useUpdateEmployeeMutation } from '@/app/redux/services/employeeApi';
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
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import {
  PrivateInfoFormSchema,
  PrivateInfoFormValues,
} from '@/lib/validation/private-info-forn-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Employee } from '@prisma/client';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

interface PrivateInfoFormProps {
  employeeId: string;
  employee: Employee | undefined;
}

const PrivateInfoForm: FC<PrivateInfoFormProps> = ({
  employeeId,
  employee,
}) => {
  const form = useForm<PrivateInfoFormValues>({
    resolver: zodResolver(PrivateInfoFormSchema),
    defaultValues: {
      privateAddress:
        employee?.privateAddress ?? 'Private address not specified',
      personalEmail: employee?.personalEmail ?? 'Personal email not specified',
      phone: employee?.phone ?? 'Phone number not specified',
      bankAccountNumber:
        employee?.bankAccountNumber ?? 'Bank account number not specified',
      bankName: employee?.bankName ?? 'Bank name not specified',
      maritalStatus: 'Single',
      numberOfDependents: 0,
      emergencyContactName:
        employee?.emergencyContactName ??
        'Emergency contact name not specified',
      emergencyContactPhone:
        employee?.emergencyContactPhone ??
        'Emergency contact phone not specified',
      nationality: employee?.nationality ?? 'Nationality not specified',
      idNumber: employee?.idNumber ?? 'ID Number not specified',
      gender: employee?.gender ?? 'Gender not specified',
      dateOfBirth: employee?.dateOfBirth ?? 'Date of Birth not specified',
    },
  });

  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();

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
          nationality: data.nationality,
          idNumber: data.idNumber,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth,
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
                  <FormLabel>Private Address</FormLabel>
                  <FormField
                    name='privateAddress'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} className='text-sm text-gray-600 dark:text-gray-300' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormLabel>Personal Email</FormLabel>
                <FormField
                  name='personalEmail'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} className='text-sm text-gray-600 dark:text-gray-300' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormLabel>Phone</FormLabel>
                <FormField
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} className='text-sm text-gray-600 dark:text-gray-300' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormLabel>Bank Name</FormLabel>
                <FormField
                  name='bankName'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} className='text-sm text-gray-600 dark:text-gray-300' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormLabel>Bank Account Number</FormLabel>
                <FormField
                  name='bankAccountNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} className='text-sm text-gray-600 dark:text-gray-300' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Family Status */}
            <div>
              <h2 className='text-lg font-semibold'>Family Status</h2>
              <Separator className='mt-1 mb-3' />
              <div className='flex flex-col gap-y-4'>
                <FormLabel>Marital Status</FormLabel>
                <FormField
                  name='maritalStatus'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} className='text-sm text-gray-600 dark:text-gray-300' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormLabel>Number of dependent children</FormLabel>
                <FormField
                  name='numberOfDependents'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} className='text-sm text-gray-600 dark:text-gray-300' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Emergency contacts */}
          <div className='flex justify-between mt-5'>
            <div className='w-1/2'>
              <h2 className='text-lg font-semibold'>Emergency Contact</h2>
              <Separator className='mt-1 mb-3' />
              <div className='flex flex-col gap-y-4'>
                <FormLabel>Contact Name</FormLabel>
                <FormField
                  name='emergencyContactName'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} className='text-sm text-gray-600 dark:text-gray-300' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormLabel>Contact Number</FormLabel>
                <FormField
                  name='emergencyContactPhone'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} className='text-sm text-gray-600 dark:text-gray-300' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Citizenship*/}

            <div>
              <h2 className='text-lg font-semibold'>Citizenship</h2>
              <Separator className='mt-1 mb-3' />
              <div className='flex flex-col gap-y-4'>
                <FormLabel>Nationality</FormLabel>
                <FormField
                  name='nationality'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} className='text-sm text-gray-600 dark:text-gray-300' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormLabel>ID Number</FormLabel>
                <FormField
                  name='idNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} className='text-sm text-gray-600 dark:text-gray-300' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormLabel>Gender</FormLabel>
                <FormField
                  name='gender'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} className='text-sm text-gray-600 dark:text-gray-300' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormLabel>Date of Birth</FormLabel>
                <FormField
                  name='dateOfBirth'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} className='text-sm text-gray-600 dark:text-gray-300' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
