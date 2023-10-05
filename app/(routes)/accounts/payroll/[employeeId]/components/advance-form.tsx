'use client';
import { useAddSalaryAdvanceMutation } from '@/app/redux/services/payrollApi';
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
import { toast } from '@/hooks/use-toast';
import {
  SalaryAdvanceFormSchema,
  SalaryAdvanceFormValues,
} from '@/lib/validation/salary-advance-form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const SalaryAdvanceForm = () => {
  const params = useParams();
  const router = useRouter()
  const employeeId = params?.employeeId;
  const form = useForm<SalaryAdvanceFormValues>({
    resolver: zodResolver(SalaryAdvanceFormSchema),
    defaultValues: {
      amount: '',
      date: new Date().toISOString().split('T')[0],
    },
  });

  const [addSalaryAdvance, { isLoading }] = useAddSalaryAdvanceMutation();

  const onSubmit = async (values: SalaryAdvanceFormValues) => {
    console.log({
      employeeId: params?.employeeId,
      date: values.date,
      amount: values.amount,
    });
    try {
      await addSalaryAdvance({ employeeId, ...values }).unwrap();
      toast({
        title: 'Salary Advance Added!',
      });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Failed to add salary advance, please try again.',
        variant: 'destructive',
      });
    }
  };
  return (
    <div className='w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex items-center gap-4 p-4 mb-4'>
            <FormLabel>Date</FormLabel>
            <FormField
              name='date'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type='date'
                      className='px-2 py-1 border rounded-md'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex items-center gap-4 p-4 mb-4'>
            <FormLabel>Amount</FormLabel>
            <FormField
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      className='px-2 py-1 border rounded-md'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='text-center'>
            <ActionButton
              type='submit'
              className='bg-[#2ebdaa] text-white'
              variant='outline'
              label='Submit'
              isLoading={isLoading}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SalaryAdvanceForm;
