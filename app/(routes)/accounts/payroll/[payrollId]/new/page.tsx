"use client";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form } from "@/components/ui/form";

interface AddPayrollPageProps {}

const AddPayrollPage: FC<AddPayrollPageProps> = ({}) => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  useEffect(() => {
    if (session && session?.user?.role !== "ADMIN") {
      router.push("/denied");
    }
  }, [session]);
  return (
    <div className='space-y-3'>
      <h1 className='text-center text-2xl font-semibold mb-8'>
        Add Employee Salary
      </h1>
      <Form>
        <div className='flex flex-col md:flex-row justify-center items-center gap-y-3 gap-x-10'>
          <div>
            <label className=''>Month</label>
            <Input
              className='md:w-96 px-2 py-1 border rounded-md'
            />
          </div>

          <div>
            <label className=''>Year</label>
            <Input
              id='floatInput'
              className='md:w-96 px-2 py-1 border rounded-md'
            />
          </div>
        </div>

        <div className='flex flex-col md:flex-row justify-center'>
          <div>
            <h1 className='font-semibold mt-5 text-[#2ebdaa]'>Earnings</h1>
            <div className='my-3'>
              <label className=''>Basic Salary</label>
              <Input
                type='text'
                placeholder=''
                id='floatInput'
                className='md:w-96 px-2 py-1 border rounded-md mr-10'
              />
            </div>
            <div className='my-5'>
              <label className=''>Data Allowance</label>
              <Input
                type='text'
                placeholder=''
                id='floatInput'
                className='md:w-96 px-2 py-1 border rounded-md  mr-10'
              />
            </div>

            <div className='my-5'>
              <label className=''>Mobile Allowance</label>
              <Input
                type='text'
                placeholder=''
                id='floatInput'
                className='md:w-96 px-2 py-1 border rounded-md '
              />
            </div>

            <div className='my-5'>
              <label className=''>Project Allowance</label>
              <Input
                type='text'
                placeholder=''
                id='floatInput'
                className='md:w-96 px-2 py-1 border rounded-md '
              />
            </div>

            <div className='my-5'>
              <label className=''>Performance Allowance</label>
              <Input
                type='text'
                placeholder=''
                id='floatInput'
                className='md:w-96 px-2 py-1 border rounded-md'
              />
            </div>

            <div className='my-5'>
              <label className=''>Holiday Allowance</label>
              <Input
                type='text'
                placeholder=''
                id='floatInput'
                className='md:w-96 px-2 py-1 border rounded-md '
              />
            </div>
          </div>

          <div>
            <h1 className='font-semibold mt-5 text-[#2ebdaa]'>Deductions</h1>

            <div className='my-3'>
              <label className=''>Salary Advance</label>
              <Input
                type='text'
                placeholder=''
                id='floatInput'
                className='md:w-96 px-2 py-1 border rounded-md '
              />
            </div>

            <div className='my-5'>
              <label className=''>EPF Deduction</label>
              <Input
                type='text'
                placeholder=''
                id='floatInput'
                className='md:w-96 px-2 py-1 border rounded-md '
              />
            </div>

            <div className='my-5'>
              <label className=''>Other Deductions</label>
              <Input
                type='text'
                placeholder=''
                id='floatInput'
                className='md:w-96 px-2 py-1 border rounded-md '
              />
            </div>
          </div>
        </div>
        {/* <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="sample select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select> */}
      </Form>
    </div>
  );
};
// NOTE: I will implement form validation later
// copy this code to edit page as well

export default AddPayrollPage;
