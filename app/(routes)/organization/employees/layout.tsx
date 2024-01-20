import { Metadata } from 'next';
import EmployeeSidebar from './components/employee-sidebar';

export const metadata: Metadata = {
  title: 'Employee Management',
  description: 'Advanced form example using react-hook-form and Zod.',
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {

  return (
    <div className='flex'>
      {/* <EmployeeSidebar /> */}
      <div className='space-y-6 p-10 pb-16 w-full'>
        <div className='flex flex-col justify-center items-center space-y-8 lg:space-x-12 lg:space-y-0'>
          <div className='flex max-w-full'>{children}</div>
        </div>
      </div>
    </div>
  );
}
