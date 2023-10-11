'use client';
import { useCreateClientMutation } from '@/app/redux/services/clientApi';
import ActionButton from '@/components/buttons/action-button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import {
  ClientFormSchema,
  ClientFormValues,
} from '@/lib/validation/client-form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

interface AddClientProps {}

const AddClient: FC<AddClientProps> = ({}) => {
  const router = useRouter();
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(ClientFormSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      phone: '',
    },
  });

  const [createClient, { isLoading: isCreateClientLoading }] =
    useCreateClientMutation();

  const onSubmit = async (values: ClientFormValues) => {
    await createClient({
      name: values.name,
      email: values.email,
      address: values.address,
      phone: values.phone,
    }).unwrap();
    try {
      toast({
        title: 'Client added successfully',
      });
      router.push('/clients');
      router.refresh();
    } catch (error) {
      console.log(error);
      return toast({
        title: 'Something went wrong!',
        description: 'Failed to add new client, please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='bg-white dark:bg-slate-700/60 p-5 rounded-lg w-[800px]'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-3'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Name</FormLabel>
                <Input
                  {...field}
                  placeholder='Enter Client Name'
                  className='w-full'
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Email</FormLabel>
                <Input
                  {...field}
                  placeholder='Enter Client Email'
                  className='w-full'
                  type='email'
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Address</FormLabel>
                <Input
                  {...field}
                  placeholder='Enter Client Address'
                  className='w-full'
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Contact Number</FormLabel>
                <Input
                  {...field}
                  placeholder='Enter Client Contact Number'
                  className='w-full'
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='mt-4'>
            <ActionButton
              isLoading={isCreateClientLoading}
              type='submit'
              onClick={() => onSubmit}
              label='Add new client'
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddClient;
