'use client';
import { addPayrollData } from '@/app/redux/features/payrollSlice';
import { useAppDispatch } from '@/app/redux/hooks';
import { useGetEmployeeByIdQuery } from '@/app/redux/services/employeeApi';
import { useAddPayrollMutation } from '@/app/redux/services/payrollApi';
import ActionButton from '@/components/buttons/action-button';
import { Button } from '@/components/ui/button';
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
  PayrollFormSchema,
  PayrollFormValues,
} from '@/lib/validation/payroll-form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Employee } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface AddPayrollPageProps {
  params: {
    employeeId: string;
  };
}

const AddPayrollPage: FC<AddPayrollPageProps> = ({ params }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const employeeId = params.employeeId;

  const { data: employeeData, isLoading } = useGetEmployeeByIdQuery({
    employeeId,
  });

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [basicSalary, setBasicSalary] = useState(0);
  const [totalAdditions, setTotalAdditions] = useState(0);
  const [totalDeductions, setTotalDeductions] = useState(0);
  const [netSalary, setNetSalary] = useState(0);

  console.log('netSalary', netSalary);
  console.log('total deductions', totalDeductions);

  const [addPayroll, { isLoading: isAddPayrollLoading }] =
    useAddPayrollMutation();

  const form = useForm<PayrollFormValues>({
    resolver: zodResolver(PayrollFormSchema),
    defaultValues: {
      monthYear: '',
      basicSalary: employee?.basicSalary?.toString(),
      dataAllowance: employee?.dataAllowance?.toString(),
      mobileAllowance: employee?.mobileAllowance?.toString(),
      projectAllowance: '',
      performanceAllowance: employee?.performanceAllowance?.toString(),
      holidayAllowance: '',
      epfDeduction: '',
      otherDeductions: '',
      workingDays: '',
      paidDays: '',
    },
  });

  const employeeEpfAmount =
    (employee?.basicSalary! +
      employee?.dataAllowance! +
      employee?.mobileAllowance!) *
    0.08;

  useEffect(() => {
    if (employeeData) {
      setEmployee(employeeData);
    }

    if (employeeData) {
      form.setValue('basicSalary', employeeData?.basicSalary?.toString() ?? '');
      form.setValue(
        'dataAllowance',
        employeeData?.dataAllowance?.toString() ?? ''
      );
      form.setValue(
        'mobileAllowance',
        employeeData?.mobileAllowance?.toString() ?? ''
      );
      form.setValue(
        'performanceAllowance',
        employeeData?.performanceAllowance?.toString() ?? ''
      );
    }
  }, [employeeData]);

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    let currentMonth = (currentDate.getMonth() + 1).toString();
    if (currentMonth.length === 1) {
      currentMonth = `0${currentMonth}`;
    }
    const defaultMonthYear = `${currentYear}-${currentMonth}`;

    form.setValue('monthYear', defaultMonthYear);
  }, [form]);

  useEffect(() => {
    const parsedBasicSalary = parseFloat(form.getValues('basicSalary'));
    const parsedDataAllowance = parseFloat(form.getValues('dataAllowance'));
    const parsedMobileAllowance = parseFloat(form.getValues('mobileAllowance'));
    const parsedPerformanceAllowance = parseFloat(
      form.getValues('performanceAllowance')
    );

    const additions =
      parsedDataAllowance + parsedMobileAllowance + parsedPerformanceAllowance;

    const deductions =
      employeeEpfAmount + parseFloat(form.getValues('otherDeductions'));

    const netSalary = parsedBasicSalary + additions - deductions;

    setBasicSalary(parsedBasicSalary);
    setTotalAdditions(additions);
    setTotalDeductions(deductions);
    setNetSalary(netSalary);
  }, [
    form.getValues('basicSalary'),
    form.getValues('dataAllowance'),
    form.getValues('mobileAllowance'),
    form.getValues('performanceAllowance'),
    form.getValues('epfDeduction'),
    form.getValues('otherDeductions'),
  ]);

  const calculateValues = (values: PayrollFormValues) => {
    const {
      dataAllowance,
      mobileAllowance,
      projectAllowance,
      performanceAllowance,
      holidayAllowance,
      otherDeductions,
      basicSalary,
    } = values;

    const parsedDataAllowance = parseFloat(dataAllowance) || 0;
    const parsedMobileAllowance = parseFloat(mobileAllowance) || 0;
    const parsedProjectAllowance = parseFloat(projectAllowance) || 0;
    const parsedPerformanceAllowance = parseFloat(performanceAllowance) || 0;
    const parsedHolidayAllowance = parseFloat(holidayAllowance) || 0;
    const parsedEpfDeduction =
      parseFloat(employeeEpfAmount as unknown as string) || 0;
    const parsedOtherDeductions = parseFloat(otherDeductions) || 0;

    const totalAdditions =
      parsedDataAllowance +
      parsedMobileAllowance +
      parsedProjectAllowance +
      parsedPerformanceAllowance +
      parsedHolidayAllowance;

    const totalDeductions = parsedEpfDeduction + parsedOtherDeductions;

    const total = parseFloat(basicSalary) + totalAdditions - totalDeductions;

    setTotalAdditions(totalAdditions);
    setTotalDeductions(totalDeductions);
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
          epfDeduction: parseFloat(employeeEpfAmount as unknown as string),
          otherDeductions: parseFloat(values.otherDeductions),
          workingDays: parseInt(values.workingDays),
          paidDays: parseInt(values.paidDays),
        },
      }).unwrap();
      const payroll = response; // Access the nested data
      dispatch(addPayrollData(payroll));
      toast({
        title: 'Success',
        description: 'Employee salary successfully added',
      });
      form.reset();
      router.push(`/accounts/payroll/${employeeId}`);
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, Please try again',
        variant: 'destructive',
      });
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col md:flex-row justify-center gap-x-10">
        <div>
          <h1 className="font-semibold mt-5 text-center">
            Add Employee Salary
          </h1>
          <div className="my-3">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="my-3">
                    <FormLabel>Month & Year</FormLabel>
                    <FormField
                      name="monthYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              className="md:w-[300px] px-2 py-1 border rounded-md"
                              type="month"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="my-3">
                    <FormLabel>Number of Worked Days</FormLabel>
                    <FormField
                      name="workingDays"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              className="md:w-[300px] px-2 py-1 border rounded-md"
                              type="number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="my-3">
                    <FormLabel>Number of Paid Days</FormLabel>
                    <FormField
                      name="paidDays"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              className="md:w-[300px] px-2 py-1 border rounded-md"
                              type="number"
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
                    <h1 className="font-semibold mt-5 text-[#2ebdaa]">
                      Earnings
                    </h1>
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
                                onChange={(e) => {
                                  form.setValue('basicSalary', e.target.value);
                                  calculateValues({
                                    ...form.getValues(),
                                    basicSalary: e.target.value,
                                  });
                                }}
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
                                onChange={(e) => {
                                  form.setValue(
                                    'dataAllowance',
                                    e.target.value
                                  );
                                  calculateValues({
                                    ...form.getValues(),
                                    basicSalary: e.target.value,
                                  });
                                }}
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
                                type="number"
                                className="md:w-96 px-2 py-1 border rounded-md"
                                onChange={(e) => {
                                  form.setValue(
                                    'mobileAllowance',
                                    e.target.value
                                  );
                                  calculateValues({
                                    ...form.getValues(),
                                    basicSalary: e.target.value,
                                  });
                                }}
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
                                type="number"
                                className="md:w-96 px-2 py-1 border rounded-md"
                                onChange={(e) => {
                                  form.setValue(
                                    'projectAllowance',
                                    e.target.value
                                  );
                                  calculateValues({
                                    ...form.getValues(),
                                    basicSalary: e.target.value,
                                  });
                                }}
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
                                type="number"
                                className="md:w-96 px-2 py-1 border rounded-md"
                                onChange={(e) => {
                                  form.setValue(
                                    'performanceAllowance',
                                    e.target.value
                                  );
                                  calculateValues({
                                    ...form.getValues(),
                                    basicSalary: e.target.value,
                                  });
                                }}
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
                                type="number"
                                className="md:w-96 px-2 py-1 border rounded-md"
                                onChange={(e) => {
                                  form.setValue(
                                    'holidayAllowance',
                                    e.target.value
                                  );
                                  calculateValues({
                                    ...form.getValues(),
                                    basicSalary: e.target.value,
                                  });
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <h1 className="font-semibold mt-5 text-[#2ebdaa]">
                      Deductions
                    </h1>
                    <div className="my-5">
                      <FormLabel>Other Deductions</FormLabel>
                      <FormField
                        name="otherDeductions"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                className="md:w-96 px-2 py-1 border rounded-md"
                                onChange={(e) => {
                                  form.setValue(
                                    'otherDeductions',
                                    e.target.value
                                  );
                                  calculateValues({
                                    ...form.getValues(),
                                    basicSalary: e.target.value,
                                  });
                                }}
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
                        <div className="grid grid-cols-2 gap-4 mt-2 ">
                          <div>
                            <p className="font-medium">
                              EPF Employee Contribution :{' '}
                              {(basicSalary * 0.08).toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-right font-medium">
                              earnings* 8%
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">
                              EPF Company Contribution :{' '}
                              {(basicSalary * 0.15).toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-right font-medium">
                              earnings* 15%
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">
                              ETF Company Contribution :{' '}
                              {(basicSalary * 0.03).toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-right font-medium">
                              earnings* 3%
                            </p>
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
                        <p className="text-right font-medium">
                          {totalAdditions}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Total Deductions :</p>
                      </div>
                      <div>
                        <p className="text-right font-medium">
                          {totalDeductions}
                        </p>
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
                    isLoading={isAddPayrollLoading}
                  />
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPayrollPage;
