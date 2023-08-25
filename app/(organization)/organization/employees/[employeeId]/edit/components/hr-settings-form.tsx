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
  HRSettingsFormSchema,
  HRSettingsFormValues,
} from '@/lib/validation/hr-settings-form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

interface HRSettingsFormProps {}

const HRSettingsForm: FC<HRSettingsFormProps> = ({}) => {
  const form = useForm<HRSettingsFormValues>({
    resolver: zodResolver(HRSettingsFormSchema),
    defaultValues: {
      employeeType: 'Permanent',
      relatedUser: 'Prathibha Ratnayake',
    },
  });

  const onSubmit = (data: HRSettingsFormValues) => {
    // Perform save action here using data
    console.log(data);
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex justify-between'>
            {/* Status */}
            <div>
              <h2 className='text-lg font-semibold'>Status</h2>
              <Separator className='mt-1 mb-3' />
              <div className='flex flex-col gap-y-4'>
                <span>
                  Employee Type :{' '}
                  <FormField
                    name='employeeType'
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
                  Related User:{' '}
                  <FormField
                    name='relatedUser'
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

export default HRSettingsForm;
