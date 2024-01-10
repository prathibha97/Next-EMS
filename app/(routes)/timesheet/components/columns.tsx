"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { useRemoveTimeLogMutation } from "@/app/redux/services/timeLogApi";
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
import { toast } from "@/hooks/use-toast";
import { TaskWorkWithTaskWithProjectWithClient } from "@/types";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EditTimeLogDialog } from "./edit-timelog";
import ViewTimeLog from "./view-timelog";

export const columns: ColumnDef<TaskWorkWithTaskWithProjectWithClient>[] = [
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
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorFn: (row) => format(new Date(row?.date || ""), "yyyy-MM-dd"),
  },
  // {
  //   accessorKey: 'employee_name',
  //   header: 'Employee',
  //   cell: ({ row }) => (
  //     <div className='capitalize'>{row.getValue('employee_name')}</div>
  //   ),
  // },
  // {
  //   accessorKey: 'task_project_Client_name',
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant='ghost'
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         Client
  //         <ArrowUpDown className='ml-2 h-4 w-4' />
  //       </Button>
  //     );
  //   },
  //   accessorFn: (row) => row.task.project.client.name,
  // },
  {
    accessorKey: "task_project_name",
    header: () => <div>Project</div>,
    accessorFn: (row) => row.task.project.name,
  },
  {
    accessorKey: "task_title",
    header: () => <div>Task</div>,
    accessorFn: (row) => row.task.title,
  },
  {
    accessorKey: "description",
    header: () => <div>Work Performed</div>,
    cell: ({ row }) => (
      <div className="truncate">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "startTime",
    header: () => <div className='text-center'>Start Time</div>,
    cell: ({ row }) => {
      const startTime = row.getValue("startTime");
      const formattedTime = format(startTime as Date, "HH:mm");
      return <div className="text-center">{`${formattedTime}`}</div>;
    },
  },
  {
    accessorKey: "endTime",
    header: () => <div className='text-center'>End Time</div>,
    cell: ({ row }) => {
      const endTime = row.getValue("endTime");
      const formattedTime = format(endTime as Date, "HH:mm");
      return <div className="text-center">{`${formattedTime}`}</div>;
    },
  },
  {
    accessorKey: "hoursWorked",
    header: () => <div className='text-center'>Time Spent</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("hoursWorked")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const timeLog = row.original;
      const router = useRouter();
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
      const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

      const [removeTimeLog] = useRemoveTimeLogMutation();

      if (isEditDialogOpen) {
        return (
          <EditTimeLogDialog
            isOpen={isEditDialogOpen}
            setIsOpen={setIsEditDialogOpen}
            employeeId={timeLog.employeeId}
            timeLog={timeLog}
          />
        );
      }

      if (isViewDialogOpen) {
        return (
          <ViewTimeLog
            isOpen={isViewDialogOpen}
            setIsOpen={setIsViewDialogOpen}
            timeLog={timeLog}
          />
        );
      }
      const handleDelete = async () => {
        try {
          await removeTimeLog(timeLog.id).unwrap();
          router.refresh();
          toast({
            title: "Time record removed successfully",
          });
        } catch (error) {
          toast({
            title: "Something went wrong!",
            description: "Failed to remove time record, please try again",
            variant: "destructive",
          });
          console.log(error);
        }
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
            <DropdownMenuItem onClick={() => setIsViewDialogOpen(true)}>
              View Time Log
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
              Edit Time Log
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500" onClick={handleDelete}>
              Delete Time Log
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
