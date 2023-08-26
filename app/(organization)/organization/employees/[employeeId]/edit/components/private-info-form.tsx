import { useUpdateEmployeeMutation } from '@/app/redux/services/employeeApi';
import ActionButton from '@/components/buttons/action-button';
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
import { FC } from 'react';
import { useForm } from 'react-hook-form';

interface PrivateInfoFormProps {
  employeeId: string;
}

const PrivateInfoForm: FC<PrivateInfoFormProps> = ({ employeeId }) => {
  const form = useForm<PrivateInfoFormValues>({
    resolver: zodResolver(PrivateInfoFormSchema),
    defaultValues: {
      privateAddress:
        '147/6 Pallewatte, Uduwawala, Katugastota, Kandy, Central, 20800, Sri Lanka',
      personalEmail: 'prathibha@gmail.com',
      phone: '0772940655',
      bankAccountNumber: '123456789',
      bankName: 'Commercial Bank',
      maritalStatus: 'Single',
      numberOfDependents: 0,
      emergencyContactName: 'Jane Doe',
      emergencyContactPhone: '0771234567',
      nationality: 'Sri Lankan',
      idNumber: '972678580V',
      gender: 'Male',
      dateOfBirth: '1997-09-20',
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
            <div>
              <h2 className='text-lg font-semibold'>Private Contact</h2>
              <Separator className='mt-1 mb-3' />
              <div className='flex flex-col gap-y-4'>
                <div className='flex gap-x-2'>
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
            <div>
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
            <div>
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
                  date of Birth :{' '}
                  <FormField
                    name='dateOfBirth'
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
