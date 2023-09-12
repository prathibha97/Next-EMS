'use client';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Form } from '@/components/ui/form';


interface AddPayrollPageProps {}

const AddPayrollPage: FC<AddPayrollPageProps> = ({}) => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/');
    },
  });
  useEffect(() => {
    if (session && session?.user?.role !== 'ADMIN') {
      router.push('/denied');
    }
  }, [session]);
  return (
    <div className='space-y-3'>
      <Form>
      <Input placeholder='sample input' />
      <Select>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='sample select' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='light'>Light</SelectItem>
          <SelectItem value='dark'>Dark</SelectItem>
          <SelectItem value='system'>System</SelectItem>
        </SelectContent>
      </Select>
      </Form>
    </div>
  );
};
// NOTE: I will implement form validation later
// copy this code to edit page as well

export default AddPayrollPage;
