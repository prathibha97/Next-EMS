'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface AddSalaryProps {
  employeeId: string;
}

const AddSalary: FC<AddSalaryProps> = ({ employeeId }) => {
  const router = useRouter();
  return (
    <div
      className='bg-[#f1f5f9] w-24 h-24 border border-[#2ebdaa] flex flex-col justify-center p-2 rounded-lg drop-shadow-lg cursor-pointer'
      onClick={() => router.push(`/accounts/payroll/${employeeId}/new`)}
    >
      <div className='flex  justify-center'>
        <Image
          src='/icons/add-salary-icon.png'
          alt='Image 1'
          width={60}
          height={60}
        />
      </div>

      <p className='text-sm font-semibold mt-1'>Add Salary</p>
    </div>
  );
};

export default AddSalary;
