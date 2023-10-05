'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  useGetPayrollByEmployeeIdQuery,
  useRemovePayrollMutation,
} from '@/app/redux/services/payrollApi';
import { Payroll } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { selectPayroll } from '@/app/redux/features/payrollSlice';
import { useAppDispatch } from '@/app/redux/hooks';
import { addDays, isAfter } from 'date-fns';

export const columns: ColumnDef<Payroll>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'monthYear',
    header: 'Payroll Period',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('monthYear')}</div>
    ),
  },
  // {
  //   accessorKey: 'month',
  //   header: 'Month',
  //   cell: ({ row }) => (
  //     <div className='capitalize'>{row.getValue('month')}</div>
  //   ),
  // },
  {
    accessorKey: 'basicSalary',
    header: () => <div className='text-left -ml-3'>Basic Salary</div>,
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('basicSalary')}</div>
    ),
  },
  {
    accessorKey: 'netSalary',
    header: () => <div className='text-left -ml-3'>Net Salary</div>,
    cell: ({ row }) => <div>{row.getValue('netSalary')}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const router = useRouter();
      const paysheet = row.original;

      const [removePayroll] = useRemovePayrollMutation();
      const { refetch } = useGetPayrollByEmployeeIdQuery(paysheet.employeeId);
      const dispatch = useAppDispatch();

      function EmployeeDetails() {
        return (
          <table className='border-2 border-[#2ebdaa]'>
            <tbody>
              <tr>
                <td className='p-2 font-semibold'>Employee Name</td>
                <td className='p-2 font-normal border-r-2 border-[#2ebdaa]'>
                  {/* @ts-ignore */}
                  {paysheet.employee.name}
                </td>
                <td className='p-2 font-semibold'>Department</td>
                <td className='p-2 font-normal'>
                  {/* @ts-ignore */}
                  {paysheet.employee.employeeDepartment.name}
                </td>
              </tr>
              <tr className='border-2 border-[#2ebdaa]'>
                <td className='p-2 font-semibold'>Employee ID</td>
                <td className='p-2 font-normal border-r-2 border-[#2ebdaa]'>
                  {/* @ts-ignore */}
                  {paysheet.employee.employeeNumber}
                </td>
                <td className='p-2 font-semibold'>Bank</td>
                <td className='p-2 font-normal'>
                  {' '}
                  {/* @ts-ignore */}
                  {paysheet.employee.bankName}
                </td>
              </tr>
              <tr>
                <td className='p-2 font-semibold'>Designation</td>
                <td className='p-2 font-normal border-r-2 border-[#2ebdaa]'>
                  {/* @ts-ignore */}
                  {paysheet.employee.jobPosition}
                </td>
                <td className='p-2 font-semibold'>Account Number</td>
                <td className='p-2 font-normal'>
                  {/* @ts-ignore */}
                  {paysheet.employee.bankAccountNumber}
                </td>
              </tr>
              <tr className='border-2 border-[#2ebdaa]'>
                <td className='p-2 font-semibold'>Worked Days</td>
                <td className='p-2 font-normal border-r-2 border-[#2ebdaa]'>
                  {/* @ts-ignore */}
                  {paysheet.workingDays}
                </td>
                <td className='p-2 font-semibold'>Paid Days</td>
                <td className='p-2 font-normal'>
                  {/* @ts-ignore */}
                  {paysheet.paidDays}
                </td>
              </tr>
            </tbody>
          </table>
        );
      }

      function SalaryDetails() {
        return (
          <table className='border-2 border-[#2ebdaa]'>
            <tbody>
              <tr className=''>
                <td className='p-2 font-semibold border-b-2  border-[#2ebdaa]  '>
                  Earnings
                </td>
                <td className='p-2 font-normal  border-b-2 border-r-2 border-[#2ebdaa] '></td>
                <td className='p-2 font-semibold border-b-2  border-[#2ebdaa] '>
                  Deductions
                </td>
                <td className='p-2 font-normal border-b-2 border-r-2 border-[#2ebdaa]'></td>
              </tr>
              <tr>
                <td className='p-2 font-normal border-r-2 border-[#2ebdaa]'>
                  Basic Wage
                </td>
                <td className='p-2 font-normal border-r-2 border-[#2ebdaa] text-right'>
                  {paysheet.basicSalary}
                </td>
                <td className='p-2 font-normal border-r-2 border-[#2ebdaa]'>
                  EPF
                </td>
                <td className='p-2 font-normal border-r-2 border-[#2ebdaa] text-right'>
                  {paysheet.epfDeduction}
                </td>
              </tr>
              <tr>
                {paysheet.mobileAllowance !== 0 && (
                  <>
                    <td className='p-2 font-normal border-r-2 border-[#2ebdaa]'>
                      Mobile Allowance
                    </td>
                    <td className='p-2 font-normal border-r-2 border-[#2ebdaa] text-right'>
                      {paysheet.mobileAllowance}
                    </td>
                  </>
                )}
                {paysheet.salaryAdvance !== 0 && (
                  <>
                    <td className='p-2 font-normal border-r-2 border-[#2ebdaa] '>
                      Salary Advance
                    </td>
                    <td className='p-2 font-normal text-right '>
                      {paysheet.salaryAdvance}
                    </td>
                  </>
                )}
              </tr>
              <tr>
                {paysheet.dataAllowance !== 0 && (
                  <>
                    <td className='p-2 font-normal border-r-2 border-[#2ebdaa]'>
                      Data Allowance
                    </td>
                    <td className='p-2 font-normal border-r-2 border-[#2ebdaa] text-right'>
                      {paysheet.dataAllowance}
                    </td>
                  </>
                )}
                {paysheet.otherDeductions !== 0 && (
                  <>
                    <td className='p-2 font-normal border-r-2 border-[#2ebdaa]'>
                      Other Deductions
                    </td>
                    <td className='p-2 font-normal text-right'>
                      {paysheet.otherDeductions}
                    </td>
                  </>
                )}
              </tr>

              <tr>
                {paysheet.projectAllowance !== 0 &&
                  paysheet.projectAllowance !== null && (
                    <>
                      <td className='p-2 font-normal border-r-2 border-[#2ebdaa]'>
                        Project Allowance
                      </td>
                      <td className='p-2 font-normal border-r-2 border-[#2ebdaa] text-right'>
                        {paysheet.projectAllowance}
                      </td>
                    </>
                  )}
              </tr>

              <tr>
                {paysheet.performanceAllowance !== 0 && (
                  <>
                    <td className='p-2 font-normal border-r-2 border-[#2ebdaa]'>
                      Performace Allowance
                    </td>
                    <td className='p-2 font-normal border-r-2 border-[#2ebdaa] text-right'>
                      {paysheet.performanceAllowance}
                    </td>
                  </>
                )}
                <td className='p-2 font-semibold border-r-2 border-[#2ebdaa]'></td>
                <td className='p-2 font-normal'></td>
              </tr>

              <tr>
                {paysheet.holidayAllowance !== 0 &&
                  paysheet.holidayAllowance !== null && (
                    <>
                      <td className='p-2 font-normal border-r-2 border-[#2ebdaa]'>
                        Holiday Allowance
                      </td>
                      <td className='p-2 font-normal border-r-2 border-[#2ebdaa] text-right'>
                        {paysheet.holidayAllowance}
                      </td>
                    </>
                  )}
                <td className='p-2 font-semibold border-r-2 border-[#2ebdaa]'></td>
                <td className='p-2 font-normal'></td>
              </tr>

              <tr>
                <td className='p-2 font-semibold border-2 border-[#2ebdaa]'>
                  Total Earnings
                </td>
                <td className='p-2 font-normal border-2 border-[#2ebdaa] text-right'>
                  {paysheet.totalEarnings}
                </td>
                <td className='p-2 font-semibold border-2 border-[#2ebdaa]'>
                  Total Deductions
                </td>
                <td className='p-2 font-normal border-2 border-[#2ebdaa] text-right '>
                  {paysheet.totalDeductions}
                </td>
              </tr>
              {paysheet.loanDeduction !== 0 &&
                paysheet.loanDeduction !== null && (
                  <>
                    <td className='p-2 font-normal border-r-2 border-[#2ebdaa]'>
                      Loan Deduction
                    </td>
                    <td className='p-2 font-normal border-r-2 border-[#2ebdaa] text-right'>
                      {paysheet.loanDeduction}
                    </td>
                  </>
                )}
            </tbody>
          </table>
        );
      }

      const today = new Date();

      const endOfMonth = new Date(paysheet.monthYear);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);
      endOfMonth.setDate(0); // This sets the date to the last day of the previous month.

      const endOfGracePeriod = addDays(endOfMonth, 10);

      const isPastGracePeriod = isAfter(today, endOfGracePeriod);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Dialog>
                <DialogTrigger className='text-sm text-center mx-auto w-full'>
                  View PaySheet
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      <div className='flex gap-60 content-center bg-[#2ebdaa] p-4'>
                        <div>
                          <div className='text-white font-bold text-2xl'>
                            Sphiria Digital Studio
                          </div>
                          <div className='mt-2 text-white font-normal text-base'>
                            71/2, Sri Dharmapala Mawatha,Kandy
                          </div>
                          <div className='text-white font-normal text-base'>
                            076 322 0666
                          </div>
                        </div>

                        <div className='m-auto'>
                          <Image
                            src={'/Dark BG-03.png'}
                            alt='Image'
                            width={180}
                            height={180}
                            className='rounded-lg'
                          />
                        </div>
                      </div>
                      <div className='p-4 flex justify-center flex-col gap-y-8'>
                        <div
                          className='flex justify-center flex-col gap-y-4'
                          gap-y-8
                        >
                          Pay sheet for {paysheet.monthYear}
                          <EmployeeDetails />
                        </div>

                        <SalaryDetails />
                      </div>
                      <div className='p-4 w-2/4 '>
                        <div className='grid grid-cols-2 gap-2 pl-2 border-b-2 border-[#2ebdaa]'>
                          <div>Total Earnings : </div>
                          <div className='text-right'>
                            {paysheet.totalEarnings}
                          </div>
                          <div className='mb-2'>Total Deductions :</div>

                          <div className='text-right'>
                            {paysheet.totalDeductions}
                          </div>
                        </div>
                        <div className='grid grid-cols-2 gap-2 mt-2 pl-2'>
                          <div className=''>Net Salary :</div>
                          <div className='text-right'>{paysheet.netSalary}</div>
                        </div>
                      </div>
                    </DialogTitle>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (!isPastGracePeriod) {
                  dispatch(selectPayroll(paysheet));
                  router.push(`/accounts/payroll/${paysheet.employeeId}/edit`);
                }
              }}
              disabled={isPastGracePeriod}
            >
              Edit PaySlip
            </DropdownMenuItem>
            <DropdownMenuItem
              className='text-red-500'
              onClick={() => {
                if (!isPastGracePeriod) {
                  removePayroll(paysheet.id);
                  refetch();
                  router.refresh();
                }
              }}
              disabled={isPastGracePeriod}
            >
              Delete PaySlip
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
