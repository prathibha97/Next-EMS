"use client";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ActionButton from "@/components/buttons/action-button";
import { toast } from "@/hooks/use-toast";
import {
  PayrollFormSchema,
  PayrollFormValues,
} from "@/lib/validation/payroll-form-validation";

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
      basicSalary: '',
      dataAllowance: '',
      mobileAllowance: '',
      projectAllowance: '',
      performanceAllowance: '',
      holidayAllowance: '',
      salaryAdvance: '',
      epfDeduction: '',
      otherDeductions: '',
    },
  });

  const [basicSalary, setBasicSalary] = useState(0);
  const [totalAdditions, setTotalAdditions] = useState(0);
  const [totalDeductions, setTotalDeductions] = useState(0);
  const [netSalary, setNetSalary] = useState(0);
  
  const calculateValues = (values: PayrollFormValues) => {
  const {
    dataAllowance,
    mobileAllowance,
    projectAllowance,
    performanceAllowance,
    holidayAllowance,
    salaryAdvance,
    epfDeduction,
    otherDeductions,
    basicSalary
  } = values;

  // Convert string inputs to numbers
  const parsedDataAllowance = parseFloat(dataAllowance);
  const parsedMobileAllowance = parseFloat(mobileAllowance);
  const parsedProjectAllowance = parseFloat(projectAllowance);
  const parsedPerformanceAllowance = parseFloat(performanceAllowance);
  const parsedHolidayAllowance = parseFloat(holidayAllowance);
  const parsedSalaryAdvance = parseFloat(salaryAdvance);
  const parsedEpfDeduction = parseFloat(epfDeduction);
  const parsedOtherDeductions = parseFloat(otherDeductions);

  setBasicSalary(parseFloat(basicSalary));
  
  const additions =
    parsedDataAllowance +
    parsedMobileAllowance +
    parsedProjectAllowance +
    parsedPerformanceAllowance +
    parsedHolidayAllowance;

  const deductions =
    parsedSalaryAdvance + parsedEpfDeduction + parsedOtherDeductions;


  const total = Number(basicSalary) + additions - deductions;

  setTotalAdditions(additions);
  setTotalDeductions(deductions);
  setNetSalary(total);
};

  const onSubmit = async (values: PayrollFormValues) => {
    try {
      console.log(values);
      calculateValues(values);

      toast({
        title: "Success",
        description: "Employee salary successfully added",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, Please try again",
        variant: "destructive",
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
                          type='number'
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
                          type='number'
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
              <div className='grid grid-cols-2 gap-4 mt-10'>
                <div>
                  <p className='font-medium'>Basic Salary :</p>
                </div>
                <div>
                  <p className='text-right font-medium'>{basicSalary}</p>
                </div>
                <div>
                  <p className='font-medium'>Total Additions :</p>
                </div>
                <div>
                  <p className='text-right font-medium'>{totalAdditions}</p>
                </div>
                <div>
                  <p className='font-medium'>Total Deductions :</p>
                </div>
                <div>
                  <p className='text-right font-medium'>{totalDeductions}</p>
                </div>
              </div>

              <hr />
              <div className='grid grid-cols-2 gap-4 mt-2'>
                <div>
                  <p className='font-semibold ml-0.5'>Net Salary :</p>
                </div>
                <div>
                  <p className='text-right font-semibold'>{netSalary}</p>
                </div>
              </div>
            </div>
          </div>
          <ActionButton
            label='Add Salary'
            type='submit'
            className='block rounded-md text-white bg-[#2ebdaa] p-2 ml-auto'
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
