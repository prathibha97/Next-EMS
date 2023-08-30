import Sidebar from '@/components/sidebar';
import { Separator } from '@/components/ui/separator';
import { organizationSidebarNavItems } from '@/constants/organizationsidebarNavItems';
import { Metadata } from 'next';
import { OrganizationSidebarNav } from './components/organization-sidebar-nav';

export const metadata: Metadata = {
  title: 'Sphiria Digital Studio | Organization Management',
  description: 'Manage your organization departments and employees here',
};

interface OrganizationLayoutProps {
  children: React.ReactNode;
}

export default function OrganizationLayout({ children }: OrganizationLayoutProps) {
  return (
    <div className='flex'>
      {/* <Sidebar /> */}
      <div className='space-y-6 p-10 pb-16'>
        <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Organization Management
          </h2>
          <p className='text-muted-foreground'>
            You can manage your organization departments and employees here.
          </p>
        </div>
        <Separator className='my-6' />
        <div className='flex flex-col justify-center items-center space-y-8 lg:space-x-12 lg:space-y-0'>
          <aside className='-mx-4 w-full'>
            <OrganizationSidebarNav items={organizationSidebarNavItems} />
          </aside>
          <div className='flex max-w-full'>{children}</div>
        </div>
      </div>
    </div>
  );
}
