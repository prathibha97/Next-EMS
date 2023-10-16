'use client';
import { useCreateNewLoanMutation } from '@/app/redux/services/payrollApi';
import ActionButton from '@/components/buttons/action-button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import {
  LoanFormSchema,
  LoanFormValues,
} from '@/lib/validation/loan-form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

const LoanForm = () => {
  const params = useParams();
  const router = useRouter()
  const employeeId = params?.employeeId;
  const form = useForm<LoanFormValues>({
    resolver: zodResolver(LoanFormSchema),
    defaultValues: {
      amount: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      installments: '',
    },
  });

  const [createNewLoan, { isLoading }] = useCreateNewLoanMutation();

  const onSubmit = async (values: LoanFormValues) => {
    console.log({
      employeeId,
      date: values.date,
      amount: values.amount,
      installments: values.installments,
    });
    try {
      await createNewLoan({ employeeId, ...values }).unwrap();
      toast({
        title: 'Loan Added to Employee!',
      });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Failed to add loan, please try again.',
        variant: 'destructive',
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex items-center gap-4 p-4 mb-4 w-full'>
          <FormLabel>Date</FormLabel>
          <FormField
            name='date'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type='date' className='w-full' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex items-center gap-4 p-4 mb-4 w-full'>
          <FormLabel>Amount</FormLabel>
          <FormField
            name='amount'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type='number' className='w-full' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex items-center gap-4 p-4 mb-4'>
          <FormLabel>Installments</FormLabel>
          <FormField
            name='installments'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Select Instalment Period' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Installment Period</SelectLabel>
                        <SelectItem value='2'>2 months</SelectItem>
                        <SelectItem value='3'>3 months</SelectItem>
                        <SelectItem value='4'>4 months</SelectItem>
                        <SelectItem value='5'>5 months</SelectItem>
                        <SelectItem value='6'>6 months</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex items-center justify-center mx-auto'>
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
  );
};

export default LoanForm;
