import { sidebarNavItems } from '@/constants/sidebarNavItems';
import { Metadata } from 'next';
import { SidebarNav } from './components/sidebar-nav';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Advanced form example using react-hook-form and Zod.',
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="md:container flex flex-col w-full mx-auto">
      <div className="p-4 md:p-10 pb-16">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="flex-1 lg:max-w-screen-2xl">
            <aside className="bg-slate-50 mb-5 flex justify-center items-center rounded-lg dark:bg-gray-800/40 lg:w-1/5">
              <SidebarNav
                className="flex justify-center"
                items={sidebarNavItems}
              />
            </aside>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
