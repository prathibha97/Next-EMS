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

export default function OrganizationLayout({
  children,
}: OrganizationLayoutProps) {
  return (
    <div className="md:container flex flex-col w-full mx-auto">
      <div className="p-4 md:p-10 pb-16">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">
            Organization Management
          </h2>
          <p className="text-muted-foreground">
            You can manage your organization departments, employees and leaves
            here.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-col lg:space-x-12 lg:space-y-0">
          <aside className="w-full">
            <OrganizationSidebarNav items={organizationSidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-screen-2xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
