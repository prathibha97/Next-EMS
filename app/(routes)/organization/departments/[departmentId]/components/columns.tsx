"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import {
  useGetDepartmentByIdQuery,
  useRemoveEmployeeFromDepartmentMutation,
} from "@/app/redux/services/departmentApi";
import { EmployeeHoverCard } from "@/components/cards/employee-hover-card";
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
import { Employee } from "@prisma/client";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<Employee>[] = [
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      // <div className='capitalize'>{row.getValue('name')}</div>;
      const employee = row.original;
      return (
        <div className="w-full">
          <EmployeeHoverCard employee={employee} />
        </div>
      );
    },
  },
  {
    accessorKey: "workEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("workEmail")}</div>
    ),
  },
  {
    accessorKey: "jobPosition",
    header: () => <div className="text-right">Designation</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("jobPosition")}</div>
    ),
  },
  {
    accessorKey: "workMobile",
    header: () => <div className="text-right">Contact Number</div>,
    cell: ({ row }) => <div>{row.getValue("workMobile")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const router = useRouter();
      const [removeEmployeeFromDepartment] =
        useRemoveEmployeeFromDepartmentMutation();
      const employee = row.original;
      const { refetch } = useGetDepartmentByIdQuery({
        departmentId: employee.departmentId as string,
      });
      const handleDelete = async () => {
        removeEmployeeFromDepartment({
          employeeId: employee.id,
          departmentId: employee.departmentId as string,
        });
        refetch();
        router.refresh();
      };

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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(employee.id)}
            >
              Copy employee ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                router.push(`/organization/employees/${employee.id}`)
              }
            >
              View employee
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500" onClick={handleDelete}>
              Remove from department
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
