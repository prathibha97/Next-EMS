"use client";
import { addPayrollData } from "@/app/redux/features/payrollSlice";
import { useAppDispatch } from "@/app/redux/hooks";
import { useAddPayrollMutation } from "@/app/redux/services/payrollApi";
import ActionButton from "@/components/buttons/action-button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { months } from "@/constants/months";
import { toast } from "@/hooks/use-toast";
import {
  PayrollFormSchema,
  PayrollFormValues,
} from "@/lib/validation/payroll-form-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface AddPayrollPageProps {
  params: {
    employeeId: string;
  };
}

const AddPayrollPage: FC<AddPayrollPageProps> = ({ params }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const employeeId = params.employeeId;

  const [addPayroll, { isLoading }] = useAddPayrollMutation();

  const form = useForm<PayrollFormValues>({
    resolver: zodResolver(PayrollFormSchema),
    defaultValues: {
      monthYear: "",
      basicSalary: "",
      dataAllowance: "",
      mobileAllowance: "",
      projectAllowance: "",
      performanceAllowance: "",
      holidayAllowance: "",
      salaryAdvance: "",
      epfDeduction: "",
      otherDeductions: "",
    },
  });

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    let currentMonth = (currentDate.getMonth() + 1).toString();
    if (currentMonth.length === 1) {
      currentMonth = `0${currentMonth}`;
    }
    const defaultMonthYear = `${currentYear}-${currentMonth}`;

    form.setValue("monthYear", defaultMonthYear);
  }, [form]);

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
      basicSalary,
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
      calculateValues(values);
      const response = await addPayroll({
        employeeId, // Pass the employeeId to the mutation
        body: {
          monthYear: values.monthYear,
          basicSalary: parseFloat(values.basicSalary),
          dataAllowance: parseFloat(values.dataAllowance),
          mobileAllowance: parseFloat(values.mobileAllowance),
          projectAllowance: parseFloat(values.projectAllowance),
          performanceAllowance: parseFloat(values.performanceAllowance),
          holidayAllowance: parseFloat(values.holidayAllowance),
          salaryAdvance: parseFloat(values.salaryAdvance),
          epfDeduction: parseFloat(values.epfDeduction),
          otherDeductions: parseFloat(values.otherDeductions),
        },
      }).unwrap();
      const payroll = response; // Access the nested data
      dispatch(addPayrollData(payroll));
      toast({
        title: "Success",
        description: "Employee salary successfully added",
      });
      form.reset();
      router.push(`/accounts/payroll/${employeeId}`);
      router.refresh();
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
    <div className="space-y-3">
      <h1 className="text-center text-2xl font-semibold mb-8">
        Add Employee Salary
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row gap-y-3 gap-x-10">
            {/* <div>
              <FormLabel>Month</FormLabel>
              <FormField
                control={form.control}
                name='month'
                render={({ field }) => (
                  <FormItem className='md:w-96 rounded-md'>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a month to display' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
            </div> */}
            <div>
              <FormLabel>Month & Year </FormLabel>
              <FormField
                name="monthYear"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="md:w-96 px-2 py-1 border rounded-md"
                        type="month"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-x-10">
            <div>
              <h1 className="font-semibold mt-5 text-[#2ebdaa]">Earnings</h1>
              <div className="my-3">
                <FormLabel>Basic Salary </FormLabel>
                <FormField
                  name="basicSalary"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="md:w-96 px-2 py-1 border rounded-md"
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-5">
                <FormLabel>Data Allowance</FormLabel>
                <FormField
                  name="dataAllowance"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="md:w-96 px-2 py-1 border rounded-md"
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="my-5">
                <FormLabel>Mobile Allowance</FormLabel>
                <FormField
                  name="mobileAllowance"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="md:w-96 px-2 py-1 border rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="my-5">
                <FormLabel>Project Allowance </FormLabel>
                <FormField
                  name="projectAllowance"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="md:w-96 px-2 py-1 border rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="my-5">
                <FormLabel>Performance Allowance</FormLabel>
                <FormField
                  name="performanceAllowance"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="md:w-96 px-2 py-1 border rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="my-5">
                <FormLabel>Holiday Allowance</FormLabel>
                <FormField
                  name="holidayAllowance"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="md:w-96 px-2 py-1 border rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <h1 className="font-semibold mt-5 text-[#2ebdaa]">Deductions</h1>

              <div className="my-3">
                <FormLabel>Salary Advance</FormLabel>
                <FormField
                  name="salaryAdvance"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="md:w-96 px-2 py-1 border rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* <div className='my-5'>
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
              </div> */}

              <div className="my-5">
                <FormLabel>Other Deductions</FormLabel>
                <FormField
                  name="otherDeductions"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="md:w-96 px-2 py-1 border rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <h1 className="font-semibold mt-8 text-[#2ebdaa]">
                  EPF & ETF Contribution
                </h1>
                <div>
                  {/* <div className="flex mt-2 gap-2">
                    <div className="">EPF employee Contribution:</div>
                    <div>earnings* 8%</div>
                  </div>

                  <div className="flex mt-2 gap-2">
                    <div>EPF company Contribution:</div>
                    <div>earnings* 15%</div>
                  </div>

                  <div className="flex mt-2 gap-2">
                    <div>ETF company Contribution:</div>
                    <div>earnings* 3%</div>
                  </div> */}
                  <div className="grid grid-cols-2 gap-4 mt-2 ">
                    <div>
                      <p className="font-medium">EPF Employee Contribution :</p>
                    </div>
                    <div>
                      <p className="text-right font-medium">earnings* 8%</p>
                    </div>
                    <div>
                      <p className="font-medium">EPF Company Contribution :</p>
                    </div>
                    <div>
                      <p className="text-right font-medium">earnings* 15%</p>
                    </div>
                    <div>
                      <p className="font-medium">ETF Company Contribution :</p>
                    </div>
                    <div>
                      <p className="text-right font-medium">earnings* 3%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-10">
                <div>
                  <p className="font-medium">Basic Salary :</p>
                </div>
                <div>
                  <p className="text-right font-medium">{basicSalary}</p>
                </div>
                <div>
                  <p className="font-medium">Total Additions :</p>
                </div>
                <div>
                  <p className="text-right font-medium">{totalAdditions}</p>
                </div>
                <div>
                  <p className="font-medium">Total Deductions :</p>
                </div>
                <div>
                  <p className="text-right font-medium">{totalDeductions}</p>
                </div>
              </div>

              <hr />
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="font-semibold ml-0.5">Net Salary :</p>
                </div>
                <div>
                  <p className="text-right font-semibold">{netSalary}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Button type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <ActionButton
              label="Add Salary"
              type="submit"
              className="flex ml-auto rounded-md text-white bg-[#2ebdaa]"
              onClick={() => onSubmit}
              isLoading={isLoading}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddPayrollPage;
