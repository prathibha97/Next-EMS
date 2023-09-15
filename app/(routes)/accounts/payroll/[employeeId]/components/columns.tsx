"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";

interface PaySheetData {
  payslipId: string;
  employeeId: string;
  month: string;
  year: number;
  basicSalary: number;
  netSalary: number;
}

export const columns: ColumnDef<PaySheetData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "payslipId",
    header: () => <div>PaySlip ID</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("payslipId")}</div>
    ),
  },
  {
    accessorKey: "year",
    header: "Year",
    cell: ({ row }) => <div className="capitalize">{row.getValue("year")}</div>,
  },
  {
    accessorKey: "month",
    header: "Month",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("month")}</div>
    ),
  },
  {
    accessorKey: "basicSalary",
    header: () => <div className="text-left -ml-3">Basic Salary</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("basicSalary")}</div>
    ),
  },
  {
    accessorKey: "netSalary",
    header: () => <div className="text-left -ml-3">Net Salary</div>,
    cell: ({ row }) => <div>{row.getValue("netSalary")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const router = useRouter();
      const paysheet = row.original;

      function EmployeeDetails() {
        return (
          <table className="border-2 border-[#2ebdaa]">
            {/* <thead>
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Age</th>
              </tr>
            </thead> */}
            <tbody>
              <tr>
                <td className="p-2 font-semibold">Employee Name</td>
                <td className="p-2 font-normal border-r-2 border-[#2ebdaa]">
                  Didula Dishan
                </td>
                <td className="p-2 font-semibold">Department</td>
                <td className="p-2 font-normal">Developer</td>
              </tr>
              <tr className="border-2 border-[#2ebdaa]">
                <td className="p-2 font-semibold">Employee ID</td>
                <td className="p-2 font-normal border-r-2 border-[#2ebdaa]">
                  12345
                </td>
                <td className="p-2 font-semibold">Bank</td>
                <td className="p-2 font-normal">Commercial Bank</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Designation</td>
                <td className="p-2 font-normal border-r-2 border-[#2ebdaa]">
                  Front-end Developer
                </td>
                <td className="p-2 font-semibold">Account Number</td>
                <td className="p-2 font-normal">543 1234 567</td>
              </tr>
            </tbody>
          </table>
        );
      }

      function SalaryDetails() {
        return (
          <table className="border-2 border-[#2ebdaa]">
            {/* <thead>
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Age</th>
              </tr>
            </thead> */}
            <tbody>
              <tr className="">
                <td className="p-2 font-semibold border-b-2  border-[#2ebdaa]  ">
                  Earnings
                </td>
                <td className="p-2 font-normal  border-b-2 border-r-2 border-[#2ebdaa] "></td>
                <td className="p-2 font-semibold border-b-2  border-[#2ebdaa] ">
                  Deductions
                </td>
                <td className="p-2 font-normal border-b-2 border-r-2 border-[#2ebdaa]"></td>
              </tr>
              <tr>
                <td className="p-2 font-normal border-r-2 border-[#2ebdaa]">
                  Basic Wage
                </td>
                <td className="p-2 font-normal border-r-2 border-[#2ebdaa] text-right">
                  10000
                </td>
                <td className="p-2 font-normal border-r-2 border-[#2ebdaa]">
                  EPF
                </td>
                <td className="p-2 font-normal border-r-2 border-[#2ebdaa] text-right">
                  3500
                </td>
              </tr>
              <tr>
                <td className="p-2 font-normal border-r-2 border-[#2ebdaa]">
                  Mobile Allowance
                </td>
                <td className="p-2 font-normal border-r-2 border-[#2ebdaa] text-right">
                  1500
                </td>
                <td className="p-2 font-normal border-r-2 border-[#2ebdaa] ">
                  Salary Advance
                </td>
                <td className="p-2 font-normal text-right ">1500</td>
              </tr>
              <tr>
                <td className="p-2 font-normal border-r-2 border-[#2ebdaa]">
                  Data Allowance
                </td>
                <td className="p-2 font-normal border-r-2 border-[#2ebdaa] text-right">
                  2000
                </td>
                <td className="p-2 font-normal border-r-2 border-[#2ebdaa]">
                  Other Deductions
                </td>
                <td className="p-2 font-normal text-right text-right">1000</td>
              </tr>

              <tr>
                <td className="p-2 font-normal border-r-2 border-[#2ebdaa]">
                  Project Allowance
                </td>
                <td className="p-2 font-normal border-r-2 border-[#2ebdaa] text-right text-right">
                  3000
                </td>
                <td className="p-2 font-semibold border-r-2 border-[#2ebdaa]"></td>
                <td className="p-2 font-normal"></td>
              </tr>

              <tr>
                <td className="p-2 font-normal border-r-2 border-[#2ebdaa]">
                  Performace Allowance
                </td>
                <td className="p-2 font-normal border-r-2 border-[#2ebdaa] text-right">
                  2000
                </td>
                <td className="p-2 font-semibold border-r-2 border-[#2ebdaa]"></td>
                <td className="p-2 font-normal"></td>
              </tr>

              <tr>
                <td className="p-2 font-normal border-r-2 border-[#2ebdaa]">
                  Holiday Allowance
                </td>
                <td className="p-2 font-normal border-r-2 border-[#2ebdaa] text-right">
                  1000
                </td>
                <td className="p-2 font-semibold border-r-2 border-[#2ebdaa]"></td>
                <td className="p-2 font-normal"></td>
              </tr>

              <tr>
                <td className="p-2 font-semibold border-2 border-[#2ebdaa]">
                  Total Earnings
                </td>
                <td className="p-2 font-normal border-2 border-[#2ebdaa] text-right">
                  19500
                </td>
                <td className="p-2 font-semibold border-2 border-[#2ebdaa]">
                  Total Deductions
                </td>
                <td className="p-2 font-normal border-2 border-[#2ebdaa] text-right ">
                  6000
                </td>
              </tr>
            </tbody>
          </table>
        );
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => {
                router.push(`/accounts/payroll/${payroll.employeeId}`);
              }}
            >
              View PaySlip
            </DropdownMenuItem> */}
            <DropdownMenuItem asChild>
              <Dialog>
                <DialogTrigger className="text-sm text-center mx-auto w-full">
                  View PaySheet
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      <div className="flex gap-60 content-center bg-[#2ebdaa] p-4">
                        <div>
                          <div className="text-white font-bold text-2xl">
                            Sphiria Digital Studio
                          </div>
                          <div className="mt-2 text-white font-normal text-base">
                            71/2, Sri Dharmapala Mawatha,Kandy
                          </div>
                          <div className="text-white font-normal text-base">
                            076 322 0666
                          </div>
                        </div>

                        <div className="m-auto">
                          <img
                            src={"/Dark BG-03.png"}
                            alt="Image"
                            width={180}
                            height={180}
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                      {/* <div className="p-4 font-normal ">
                        Pay sheet for {paysheet.month}, {paysheet.year}
                      </div> */}
                      <div className="p-4 flex justify-center flex-col gap-y-8">
                        <div
                          className="flex justify-center flex-col gap-y-4"
                          gap-y-8
                        >
                          Pay sheet for {paysheet.month}, {paysheet.year}
                          <EmployeeDetails />
                        </div>

                        <SalaryDetails />
                      </div>

                      {/* <div className="p-4 flex justify-center flex-col gap-y-4">
                        <div className="flex gap-x-6">
                          <div> Total Earnings : </div>
                          <div>19500.00</div>
                        </div>
                        <div className="flex">
                          <div> Total Deductions : </div>
                          <div>6000.00</div>
                        </div>
                        <div className="flex">
                          <div> Net Salary : </div>
                          <div>13500.00</div>
                        </div>
                      </div> */}
                      <div className="p-4 w-2/4 ">
                        <div className="grid grid-cols-2 gap-2 pl-2 border-b-2 border-[#2ebdaa]">
                          <div>Total Earnings : </div>
                          <div className="text-right">19500.00</div>
                          <div className="mb-2">Total Deductions :</div>

                          <div className="text-right">6000.00</div>
                        </div>
                        {/* <hr className="bg-[#2ebdaa]"></hr> */}
                        <div className="grid grid-cols-2 gap-2 mt-2 pl-2">
                          <div className="">Net Salary :</div>
                          <div className="text-right">13500.00</div>
                        </div>
                      </div>
                    </DialogTitle>

                    {/* <DialogDescription>
                      add necessary details here
                    </DialogDescription> */}
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                router.push(`/accounts/payroll/${paysheet.employeeId}/edit`);
              }}
            >
              Edit PaySlip
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500" onClick={() => {}}>
              Delete PaySlip
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];