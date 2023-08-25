import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  PrivateInfoFormSchema,
  PrivateInfoFormValues,
} from '@/lib/validation/private-info-forn-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

interface PrivateInfoFormProps {}

const PrivateInfoForm: FC<PrivateInfoFormProps> = ({}) => {
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

  const onSubmit = (data: PrivateInfoFormValues) => {
    // Perform save action here using data
    console.log(data);
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
            <Button type='submit' onClick={() => onSubmit}>
              Save
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default PrivateInfoForm;
