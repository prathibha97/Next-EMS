"use client";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ActionButton from "@/components/buttons/action-button";
import { toast } from "@/hooks/use-toast";
import { PayrollFormSchema, PayrollFormValues } from "@/lib/validation/payroll-form-validation";

interface AddPayrollPageProps {}

const AddPayrollPage: FC<AddPayrollPageProps> = ({}) => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  useEffect(() => {
    if (session && session?.user?.role !== "ADMIN") {
      router.push("/denied");
    }
  }, [session]);

  const form = useForm<PayrollFormValues>({
    resolver: zodResolver(PayrollFormSchema),
    defaultValues: {
      month: "",
      year: "",
      basicSalary: 0,
      dataAllowance: 0,
      mobileAllowance: 0,
      projectAllowance: 0,
      performanceAllowance: 0,
      holidayAllowance: 0,
      salaryAdvance: 0,
      epfDeduction: 0,
      otherDeductions: 0,
    },
  });

  const onSubmit = async (values: PayrollFormValues) => {
    try {
      console.log(values);
      toast({
        title: 'Success',
        description: 'Employee salary successfully added',
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
    <div className='space-y-3'>
      <h1 className='text-center text-2xl font-semibold mb-8'>
        Add Employee Salary
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col md:flex-row justify-center items-center gap-y-3 gap-x-10'>
            <div>
              <FormLabel>Month</FormLabel>
              <FormField
                name='month'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type='month'
                        className='md:w-96 px-2 py-1 border rounded-md'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormLabel>Year</FormLabel>
              <FormField
                name='year'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className='md:w-96 px-2 py-1 border rounded-md'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className='flex flex-col md:flex-row justify-center gap-x-10'>
            <div>
              <h1 className='font-semibold mt-5 text-[#2ebdaa]'>Earnings</h1>
              <div className='my-3'>
                <FormLabel>Basic Salary</FormLabel>
                <FormField
                  name='basicSalary'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className='md:w-96 px-2 py-1 border rounded-md'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='my-5'>
                <FormLabel>Data Allowance</FormLabel>
                <FormField
                  name='dataAllowance'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className='md:w-96 px-2 py-1 border rounded-md'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='my-5'>
                <FormLabel>Mobile Allowance</FormLabel>
                <FormField
                  name='mobileAllowance'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className='md:w-96 px-2 py-1 border rounded-md'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='my-5'>
                <FormLabel>Project Allowance</FormLabel>
                <FormField
                  name='projectAllowance'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className='md:w-96 px-2 py-1 border rounded-md'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='my-5'>
                <FormLabel>Performance Allowance</FormLabel>
                <FormField
                  name='performanceAllowance'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className='md:w-96 px-2 py-1 border rounded-md'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='my-5'>
                <FormLabel>Holiday Allowance</FormLabel>
                <FormField
                  name='holidayAllowance'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className='md:w-96 px-2 py-1 border rounded-md'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <h1 className='font-semibold mt-5 text-[#2ebdaa]'>Deductions</h1>

              <div className='my-3'>
                <FormLabel>Salary Advance</FormLabel>
                <FormField
                  name='salaryAdvance'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className='md:w-96 px-2 py-1 border rounded-md'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='my-5'>
                <FormLabel>EPF Deduction</FormLabel>
                <FormField
                  name='epfDeduction'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className='md:w-96 px-2 py-1 border rounded-md'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='my-5'>
                <FormLabel>Other Deductions</FormLabel>
                <FormField
                  name='otherDeductions'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className='md:w-96 px-2 py-1 border rounded-md'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        <ActionButton
          label='Add Salary'
          type='submit'
          onClick={() => onSubmit}
        />
        </form>
        {/* <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="sample select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select> */}
      </Form>
    </div>
  );
};
// NOTE: I will implement form validation later
// copy this code to edit page as well

export default AddPayrollPage;
