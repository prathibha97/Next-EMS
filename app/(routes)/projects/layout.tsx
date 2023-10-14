import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Management',
  description: 'Advanced form example using react-hook-form and Zod.',
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className='container flex'>
      <div className='space-y-6 p-10 pb-16'>
        <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Project Management
          </h2>
          <p className='text-muted-foreground'>
            You can manage your projects here.
          </p>
        </div>
        <Separator className='my-6' />
        <div className='space-y-6 p-10 pb-16'>
          <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <div className='flex-1 lg:max-w-screen-2xl'>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
