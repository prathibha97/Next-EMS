"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
    accessorKey: "employeeNumber",
    header: () => <div>Employee Number</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">
        {row.getValue("employeeNumber")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Employee",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "employeeDepartment.name",
    header: ({ column }) => {
      return (
        <Button
          className="-ml-6"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Department
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      // @ts-ignore
      <div className="capitalize">{row.original.employeeDepartment?.name}</div>
    ),
  },
  {
    accessorKey: "jobPosition",
    header: ({ column }) => {
      return (
        <Button
          className="-ml-6"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Designation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("jobPosition")}</div>
    ),
  },
  {
    accessorKey: "workMobile",
    header: () => <div className="text-left -ml-3">Contact Number</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("workMobile")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const router = useRouter();
      const employee = row.original;

      return (
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={() => {
            router.push(`/accounts/payroll/${employee.id}`);
          }}
        >
          <span className="sr-only">Open menu</span>
          <Eye className="h-4 w-4" />
        </Button>
      );
    },
  },
];
