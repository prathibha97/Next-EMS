"use client";
import { DataTable } from "@/components/data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { leaveBalanceData } from "@/constants/sample/leave-balance-data";
import { leaveData } from "@/constants/sample/leave-data";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC } from "react";

import { Button } from "@/components/ui/button";
import { columns } from "./components/columns";
import LeaveBalanceCard from "./components/leave-balance-card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  return (
    <div>
      <div className="mb-5">
        <Dialog>
          <DialogTrigger>
            <Button className="bg-[#2ebdaa]">Apply Leave</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mx-48 pt-10 text-xl">
                Add Leave
              </DialogTitle>
              {/* <DialogDescription>This</DialogDescription> */}
            </DialogHeader>
            <div className="px-8 mb-4">
              {/* <div>Leave Type</div> */}
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>Leave Type</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Select Leave Type</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Casual</DropdownMenuItem>
                    <DropdownMenuItem>Annual</DropdownMenuItem>
                    <DropdownMenuItem>Medical</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mb-2 mt-6">From</div>
              <Input />
              <div className="mb-2 mt-6">To</div>
              <Input />
              <div className="mb-2 mt-6">Duration in Days</div>
              <Input />
              <div className="mb-2 mt-6">Remaining leaves</div>
              <Input />
              <div className="mb-2 mt-6">Reason for leave</div>
              <Textarea />
            </div>
            <div className="mx-auto mb-4">
              <Button className="bg-[#2ebdaa] w-20 text-center">Submit</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 mb-5">
        {leaveBalanceData.map((leaveBalance) => (
          <LeaveBalanceCard
            key={leaveBalance.id}
            balance={leaveBalance.balance}
            entitlement={leaveBalance.entitlement}
            leaveType={leaveBalance.leaveType}
          />
        ))}
      </div>
      <DataTable
        columns={columns}
        data={leaveData}
        placeholder="Date"
        searchFilter="requestDate"
      />
    </div>
  );
};

export default page;
