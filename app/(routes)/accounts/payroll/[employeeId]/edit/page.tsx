// "use client";
// import { updatePayrollData } from "@/app/redux/features/payrollSlice";
// import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
// import { useUpdatePayrollMutation } from "@/app/redux/services/payrollApi";
// import ActionButton from "@/components/buttons/action-button";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { toast } from "@/hooks/use-toast";
// import {
//   PayrollFormSchema,
//   PayrollFormValues,
// } from "@/lib/validation/payroll-form-validation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import { FC, useState } from "react";
// import { useForm } from "react-hook-form";

// interface EditPayrollPageProps {
//   params: {
//     employeeId: string;
//   };
// }

// const EditPayrollPage: FC<EditPayrollPageProps> = ({ params }) => {
// const router = useRouter();
// const dispatch = useAppDispatch();

// const employeeId = params.employeeId;

// const [updatePayroll, { isLoading }] = useUpdatePayrollMutation();
// const payroll = useAppSelector((state) => state.payroll.payroll);
// console.log(payroll);

// const form = useForm<PayrollFormValues>({
//   resolver: zodResolver(PayrollFormSchema),
//   defaultValues: {
//     monthYear: payroll?.monthYear ?? "",
//     basicSalary: payroll?.basicSalary?.toString() ?? "",
//     dataAllowance: payroll?.dataAllowance?.toString() ?? "",
//     mobileAllowance: payroll?.mobileAllowance?.toString() ?? "",
//     projectAllowance: payroll?.projectAllowance?.toString() ?? "",
//     performanceAllowance: payroll?.performanceAllowance?.toString() ?? "",
//     holidayAllowance: payroll?.holidayAllowance?.toString() ?? "",
//     salaryAdvance: payroll?.salaryAdvance?.toString() ?? "",
//     epfDeduction: payroll?.epfDeduction?.toString() ?? "",
//     otherDeductions: payroll?.otherDeductions?.toString() ?? "",
//   },
// });

// const [basicSalary, setBasicSalary] = useState(payroll?.basicSalary);
// const [totalAdditions, setTotalAdditions] = useState(
//   (payroll?.dataAllowance ?? 0) +
//     (payroll?.mobileAllowance ?? 0) +
//     (payroll?.projectAllowance ?? 0) +
//     (payroll?.performanceAllowance ?? 0) +
//     (payroll?.holidayAllowance ?? 0)
// );

// const [totalDeductions, setTotalDeductions] = useState(
//   (payroll?.salaryAdvance ?? 0) +
//     (payroll?.epfDeduction ?? 0) +
//     (payroll?.otherDeductions ?? 0)
// );

// const [netSalary, setNetSalary] = useState(
//   (payroll?.basicSalary ?? 0) +
//     (payroll?.dataAllowance ?? 0) +
//     (payroll?.mobileAllowance ?? 0) +
//     (payroll?.projectAllowance ?? 0) +
//     (payroll?.performanceAllowance ?? 0) +
//     (payroll?.holidayAllowance ?? 0) -
//     (payroll?.salaryAdvance ?? 0) -
//     (payroll?.epfDeduction ?? 0) -
//     (payroll?.otherDeductions ?? 0)
// );

// const calculateValues = (values: PayrollFormValues) => {
//   const {
//     dataAllowance,
//     mobileAllowance,
//     projectAllowance,
//     performanceAllowance,
//     holidayAllowance,
//     salaryAdvance,
//     epfDeduction,
//     otherDeductions,
//     basicSalary,
//   } = values;

//   // Convert string inputs to numbers
//   const parsedDataAllowance = parseFloat(dataAllowance);
//   const parsedMobileAllowance = parseFloat(mobileAllowance);
//   const parsedProjectAllowance = parseFloat(projectAllowance);
//   const parsedPerformanceAllowance = parseFloat(performanceAllowance);
//   const parsedHolidayAllowance = parseFloat(holidayAllowance);
//   const parsedSalaryAdvance = parseFloat(salaryAdvance);
//   const parsedEpfDeduction = parseFloat(epfDeduction);
//   const parsedOtherDeductions = parseFloat(otherDeductions);

//   setBasicSalary(parseFloat(basicSalary));

//   const additions =
//     parsedDataAllowance +
//     parsedMobileAllowance +
//     parsedProjectAllowance +
//     parsedPerformanceAllowance +
//     parsedHolidayAllowance;

//   const deductions =
//     parsedSalaryAdvance + parsedEpfDeduction + parsedOtherDeductions;

//   const total = Number(basicSalary) + additions - deductions;

//   setTotalAdditions(additions);
//   setTotalDeductions(deductions);
//   setNetSalary(total);
// };

// const onSubmit = async (values: PayrollFormValues) => {
//   try {
//     calculateValues(values);
//     const response = await updatePayroll({
//       payrollId: payroll?.id, // Pass the payrollId to the mutation
//       body: {
//         monthYear: values.monthYear,
//         basicSalary: parseFloat(values.basicSalary),
//         dataAllowance: parseFloat(values.dataAllowance),
//         mobileAllowance: parseFloat(values.mobileAllowance),
//         projectAllowance: parseFloat(values.projectAllowance),
//         performanceAllowance: parseFloat(values.performanceAllowance),
//         holidayAllowance: parseFloat(values.holidayAllowance),
//         salaryAdvance: parseFloat(values.salaryAdvance),
//         epfDeduction: parseFloat(values.epfDeduction),
//         otherDeductions: parseFloat(values.otherDeductions),
//       },
//     }).unwrap();
//     const payrollData = response; // Access the nested data
//     dispatch(updatePayrollData(payrollData));
//     console.log(values);
//     toast({
//       title: "Success",
//       description: "Employee salary successfully added",
//     });
//     form.reset();
//     router.push(`/accounts/payroll/${employeeId}`);
//     router.refresh();
//   } catch (error) {
//     toast({
//       title: "Error",
//       description: "Something went wrong, Please try again",
//       variant: "destructive",
//     });
//     console.log(error);
//   }
// };

//   return (
//     <div className="space-y-3">
//       <h1 className="text-2xl font-semibold mb-8">Edit Employee Salary</h1>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <div className="flex flex-col md:flex-row gap-y-3 gap-x-10">
//             {/* <div>
//               <FormLabel>Month</FormLabel>
//               <FormField
//                 control={form.control}
//                 name='month'
//                 render={({ field }) => (
//                   <FormItem className='md:w-96 rounded-md'>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder='Select a month to display' />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {months.map((month) => (
//                           <SelectItem key={month.value} value={month.value}>
//                             {month.label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <div>
//               <FormLabel>Year</FormLabel>
//               <FormField
//                 name='year'
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         className='md:w-96 px-2 py-1 border rounded-md'
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </div> */}

//             <div>
//               <FormLabel>Month & Year</FormLabel>
//               <FormField
//                 name="monthYear"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         className="md:w-96 px-2 py-1 border rounded-md"
//                         type="month"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </div>

//           <div className="flex flex-col md:flex-row justify-center gap-x-10">
//             <div>
//               <h1 className="font-semibold mt-5 text-[#2ebdaa]">Earnings</h1>
//               <div className="my-3">
//                 <FormLabel>Basic Salary</FormLabel>
//                 <FormField
//                   name="basicSalary"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           className="md:w-96 px-2 py-1 border rounded-md"
//                           type="number"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <div className="my-5">
//                 <FormLabel>Data Allowance</FormLabel>
//                 <FormField
//                   name="dataAllowance"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           className="md:w-96 px-2 py-1 border rounded-md"
//                           type="number"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div className="my-5">
//                 <FormLabel>Mobile Allowance</FormLabel>
//                 <FormField
//                   name="mobileAllowance"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           className="md:w-96 px-2 py-1 border rounded-md"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div className="my-5">
//                 <FormLabel>Project Allowance</FormLabel>
//                 <FormField
//                   name="projectAllowance"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           className="md:w-96 px-2 py-1 border rounded-md"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div className="my-5">
//                 <FormLabel>Performance Allowance</FormLabel>
//                 <FormField
//                   name="performanceAllowance"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           className="md:w-96 px-2 py-1 border rounded-md"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div className="my-5">
//                 <FormLabel>Holiday Allowance</FormLabel>
//                 <FormField
//                   name="holidayAllowance"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           className="md:w-96 px-2 py-1 border rounded-md"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </div>

//             <div>
//               <h1 className="font-semibold mt-5 text-[#2ebdaa]">Deductions</h1>

//               <div className="my-3">
//                 <FormLabel>Salary Advance</FormLabel>
//                 <FormField
//                   name="salaryAdvance"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           className="md:w-96 px-2 py-1 border rounded-md"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div className="my-5">
//                 <FormLabel>EPF Deduction</FormLabel>
//                 <FormField
//                   name="epfDeduction"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           className="md:w-96 px-2 py-1 border rounded-md"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div className="my-5">
//                 <FormLabel>Other Deductions</FormLabel>
//                 <FormField
//                   name="otherDeductions"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           className="md:w-96 px-2 py-1 border rounded-md"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4 mt-10">
//                 <div>
//                   <p className="font-medium">Basic Salary :</p>
//                 </div>
//                 <div>
//                   <p className="text-right font-medium">{basicSalary}</p>
//                 </div>
//                 <div>
//                   <p className="font-medium">Total Additions :</p>
//                 </div>
//                 <div>
//                   <p className="text-right font-medium">{totalAdditions}</p>
//                 </div>
//                 <div>
//                   <p className="font-medium">Total Deductions:</p>
//                 </div>
//                 <div>
//                   <p className="text-right font-medium">{totalDeductions}</p>
//                 </div>
//               </div>

//               <hr />
//               <div className="grid grid-cols-2 gap-4 mt-2">
//                 <div>
//                   <p className="font-semibold ml-0.5">Net Salary :</p>
//                 </div>
//                 <div>
//                   <p className="text-right font-semibold">{netSalary}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center">
//             <Button type="button" onClick={() => router.back()}>
//               Cancel
//             </Button>
//             <ActionButton
//               label="Edit Salary"
//               type="submit"
//               className="flex ml-auto rounded-md text-white bg-[#2ebdaa]"
//               onClick={() => onSubmit}
//               isLoading={isLoading}
//             />
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default EditPayrollPage;

'use client';
import { updatePayrollData } from '@/app/redux/features/payrollSlice';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { useUpdatePayrollMutation } from '@/app/redux/services/payrollApi';
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
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

interface EditPayrollPageProps {
  params: {
    employeeId: string;
  };
}

const EditPayrollPage: FC<EditPayrollPageProps> = ({ params }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const employeeId = params.employeeId;

  const [updatePayroll, { isLoading }] = useUpdatePayrollMutation();
  const payroll = useAppSelector((state) => state.payroll.payroll);
  console.log(payroll);

  const form = useForm<PayrollFormValues>({
    resolver: zodResolver(PayrollFormSchema),
    defaultValues: {
      monthYear: payroll?.monthYear ?? '',
      basicSalary: payroll?.basicSalary?.toString() ?? '',
      dataAllowance: payroll?.dataAllowance?.toString() ?? '',
      mobileAllowance: payroll?.mobileAllowance?.toString() ?? '',
      projectAllowance: payroll?.projectAllowance?.toString() ?? '',
      performanceAllowance: payroll?.performanceAllowance?.toString() ?? '',
      holidayAllowance: payroll?.holidayAllowance?.toString() ?? '',
      salaryAdvance: payroll?.salaryAdvance?.toString() ?? '',
      epfDeduction: payroll?.epfDeduction?.toString() ?? '',
      otherDeductions: payroll?.otherDeductions?.toString() ?? '',
      paidDays: payroll?.paidDays?.toString() ?? '',
      workingDays: payroll?.workingDays?.toString() ?? '',
    },
  });

  const [basicSalary, setBasicSalary] = useState(payroll?.basicSalary);
  const [totalAdditions, setTotalAdditions] = useState(
    (payroll?.dataAllowance ?? 0) +
      (payroll?.mobileAllowance ?? 0) +
      (payroll?.projectAllowance ?? 0) +
      (payroll?.performanceAllowance ?? 0) +
      (payroll?.holidayAllowance ?? 0)
  );

  const [totalDeductions, setTotalDeductions] = useState(
    (payroll?.salaryAdvance ?? 0) +
      (payroll?.epfDeduction ?? 0) +
      (payroll?.otherDeductions ?? 0)
  );

  const [netSalary, setNetSalary] = useState(
    (payroll?.basicSalary ?? 0) +
      (payroll?.dataAllowance ?? 0) +
      (payroll?.mobileAllowance ?? 0) +
      (payroll?.projectAllowance ?? 0) +
      (payroll?.performanceAllowance ?? 0) +
      (payroll?.holidayAllowance ?? 0) -
      (payroll?.salaryAdvance ?? 0) -
      (payroll?.epfDeduction ?? 0) -
      (payroll?.otherDeductions ?? 0)
  );

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
    const parsedSalaryAdvance = parseFloat(salaryAdvance as string);
    const parsedHolidayAllowance = parseFloat(holidayAllowance);
    const parsedEpfDeduction = parseFloat(epfDeduction);
    const parsedOtherDeductions = parseFloat(otherDeductions);

    console.log(salaryAdvance);

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
      const response = await updatePayroll({
        payrollId: payroll?.id, // Pass the payrollId to the mutation
        body: {
          monthYear: values.monthYear,
          basicSalary: parseFloat(values.basicSalary),
          dataAllowance: parseFloat(values.dataAllowance),
          mobileAllowance: parseFloat(values.mobileAllowance),
          projectAllowance: parseFloat(values.projectAllowance),
          performanceAllowance: parseFloat(values.performanceAllowance),
          holidayAllowance: parseFloat(values.holidayAllowance),
          epfDeduction: parseFloat(values.epfDeduction),
          otherDeductions: parseFloat(values.otherDeductions),
          salaryAdvance: parseFloat(values.salaryAdvance as string),
          paidDays: parseInt(values.paidDays),
          workingDays: parseInt(values.workingDays),
          netSalary,
        },
      }).unwrap();
      const payrollData = response; // Access the nested data
      dispatch(updatePayrollData(payrollData));
      console.log(values);
      toast({
        title: 'Success',
        description: 'Employee salary successfully updated',
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

  return (
    <div className='space-y-3'>
      <div className='flex flex-col md:flex-row justify-center gap-x-10'>
        <div>
          <h1 className='font-semibold mt-5 text-center'>
            Update Employee Salary
          </h1>
          <div className='my-3'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='flex flex-col md:flex-row justify-between'>
                  <div className='my-3'>
                    <FormLabel>Month & Year</FormLabel>
                    <FormField
                      name='monthYear'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              className='md:w-[300px] px-2 py-1 border rounded-md'
                              type='month'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='my-3'>
                    <FormLabel>Number of Worked Days</FormLabel>
                    <FormField
                      name='workingDays'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              className='md:w-[300px] px-2 py-1 border rounded-md'
                              type='number'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='my-3'>
                    <FormLabel>Number of Paid Days</FormLabel>
                    <FormField
                      name='paidDays'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              className='md:w-[300px] px-2 py-1 border rounded-md'
                              type='number'
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
                    <h1 className='font-semibold mt-5 text-[#2ebdaa]'>
                      Earnings
                    </h1>
                    <div className='my-3'>
                      <FormLabel>Basic Salary </FormLabel>
                      <FormField
                        name='basicSalary'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                className='md:w-96 px-2 py-1 border rounded-md'
                                type='number'
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

                    <div className='my-5'>
                      <FormLabel>Mobile Allowance</FormLabel>
                      <FormField
                        name='mobileAllowance'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                type='number'
                                className='md:w-96 px-2 py-1 border rounded-md'
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

                    <div className='my-5'>
                      <FormLabel>Project Allowance </FormLabel>
                      <FormField
                        name='projectAllowance'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                type='number'
                                className='md:w-96 px-2 py-1 border rounded-md'
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

                    <div className='my-5'>
                      <FormLabel>Performance Allowance</FormLabel>
                      <FormField
                        name='performanceAllowance'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                type='number'
                                className='md:w-96 px-2 py-1 border rounded-md'
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

                    <div className='my-5'>
                      <FormLabel>Holiday Allowance</FormLabel>
                      <FormField
                        name='holidayAllowance'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                type='number'
                                className='md:w-96 px-2 py-1 border rounded-md'
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
                    <h1 className='font-semibold mt-5 text-[#2ebdaa]'>
                      Deductions
                    </h1>
                    <div className='my-5'>
                      <FormLabel>Other Deductions</FormLabel>
                      <FormField
                        name='otherDeductions'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                type='number'
                                className='md:w-96 px-2 py-1 border rounded-md'
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
                      <h1 className='font-semibold mt-8 text-[#2ebdaa]'>
                        EPF & ETF Contribution
                      </h1>
                      <div>
                        <div className='grid grid-cols-2 gap-4 mt-2 '>
                          <div>
                            <p className='font-medium'>
                              EPF Employee Contribution :{' '}
                              {(basicSalary && basicSalary * 0.08).toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className='text-right font-medium'>
                              earnings* 8%
                            </p>
                          </div>
                          <div>
                            <p className='font-medium'>
                              EPF Company Contribution :{' '}
                              {(basicSalary && basicSalary * 0.15).toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className='text-right font-medium'>
                              earnings* 15%
                            </p>
                          </div>
                          <div>
                            <p className='font-medium'>
                              ETF Company Contribution :{' '}
                              {(basicSalary && basicSalary * 0.03).toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className='text-right font-medium'>
                              earnings* 3%
                            </p>
                          </div>
                        </div>
                      </div>
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
                        <p className='text-right font-medium'>
                          {totalAdditions}
                        </p>
                      </div>
                      <div>
                        <p className='font-medium'>Total Deductions :</p>
                      </div>
                      <div>
                        <p className='text-right font-medium'>
                          {totalDeductions}
                        </p>
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
                <div className='flex items-center'>
                  <Button type='button' onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <ActionButton
                    label='Update Salary'
                    type='submit'
                    className='flex ml-auto rounded-md text-white bg-[#2ebdaa]'
                    onClick={() => onSubmit}
                    isLoading={isLoading}
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

export default EditPayrollPage;
