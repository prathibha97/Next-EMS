"use client";
import { FC } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface SalaryAdvanceProps {}

const SalaryAdvance: FC<SalaryAdvanceProps> = ({}) => {
  return (
    <Dialog>
      <DialogTrigger>
        {/* <Button className="bg-[#2ebdaa] text-white p-2 m-1 h-8">
          Add Salary Advance
        </Button> */}
        <div className="bg-[#f1f5f9] w-24 h-24 border border-[#2ebdaa] flex flex-col justify-center p-2 rounded-lg drop-shadow-lg">
          <div className="flex  justify-center">
            <Image
              src="/icons/salary-advance-icon.png"
              alt="Image 1"
              width={60}
              height={60}
            />
          </div>

          <p className="text-sm font-semibold mt-1">Advance</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="bg-[#eef5f9]">
          {/* <DialogTitle>Are you sure absolutely sure?</DialogTitle> */}
          <DialogDescription>
            <div className="bg-[#fff] m-8 rounded-lg pb-6 drop-shadow-lg">
              <div className="p-4">
                <Image
                  className="mt-6"
                  src="/icons/salary-advance.png"
                  alt="Image 2"
                  width={300}
                  height={300}
                />
              </div>
              <div>
                <div className="text-2xl text-[#2ebdaa] font-medium text-center mt-6">
                  Salary Advance
                </div>
                <div className="text-center my-4 text-slate-800">
                  When an employee requires a salary advance,<br></br> the funds
                  can be provided through this section.
                </div>
              </div>
              <div>
                <div className="flex gap-4 p-4 mb-4">
                  <Button variant="outline">Date</Button>
                  <Input />
                </div>

                <div className="text-center">
                  <Button className="bg-[#2ebdaa] text-white" variant="outline">
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SalaryAdvance;
