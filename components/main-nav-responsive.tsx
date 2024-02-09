'use client';

import {
  NavigationMenu,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { useIdleSignOut } from '@/hooks/useIdleSignOut';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  BadgeDollarSign,
  Building2,
  FolderGit,
  Users,
  UserCog,
  LayoutPanelTop,
  CableCar,
  FolderOpenDot,
  FolderKanban,
  FileCheck2,
  UserPlus,
  Eye,
  Coins,
  WalletCards,
} from 'lucide-react';

export const MainNavResponsive = ({
  className,
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();

  const { data: session } = useSession();
  const homepage = pathname === '/';

  useIdleSignOut();

  return (
    <div className={`flex flex-col w-full p-3 md:pl-8 ${homepage && 'hidden'}`}>
      {session?.user?.role === 'ADMIN' && (
        <div className="md:hidden w-full">
          <NavigationMenu>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <Building2 className="h-6 w-6" />
                  Organization
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="grid gap-2 md:w-[400px] md:grid-cols-1 lg:w-[500px] ">
                    <ListItem
                      href="/organization/employees"
                      icon={<UserCog />}
                      title="Employees"
                      className="hover:bg-slate-50 dark:hover:bg-gray-700"
                    ></ListItem>
                    <ListItem
                      href="/organization/departments"
                      icon={<LayoutPanelTop />}
                      title="Departments"
                      className="hover:bg-slate-50 dark:hover:bg-gray-700"
                    ></ListItem>
                    <ListItem
                      href="/organization/leaves"
                      icon={<CableCar />}
                      title="Leaves"
                      className="hover:bg-slate-50 dark:hover:bg-gray-700"
                    ></ListItem>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <FolderGit className="h-6 w-6" />
                  Projects
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="grid gap-2 md:w-[400px] md:grid-cols-1 lg:w-[500px] ">
                    <ListItem
                      href="/projects/new"
                      icon={<FolderOpenDot />}
                      title="Create New Project"
                      className="hover:bg-slate-50 dark:hover:bg-gray-700"
                    ></ListItem>
                    <ListItem
                      href="/projects"
                      icon={<FolderKanban />}
                      title="View Projects"
                      className="hover:bg-slate-50 dark:hover:bg-gray-700"
                    ></ListItem>
                    <ListItem
                      href="/projects/tasks"
                      icon={<FileCheck2 />}
                      title="Manage Tasks"
                      className="hover:bg-slate-50 dark:hover:bg-gray-700"
                    ></ListItem>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <Users className="h-6 w-6" />
                  Clients
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="grid gap-2 md:w-[400px] md:grid-cols-1 lg:w-[500px] ">
                    <ListItem
                      href="/clients/new"
                      icon={<UserPlus />}
                      title="Add New Client"
                      className="hover:bg-slate-50 dark:hover:bg-gray-700"
                    ></ListItem>
                    <ListItem
                      href="/clients"
                      icon={<Eye />}
                      title="View Clients"
                      className="hover:bg-slate-50 dark:hover:bg-gray-700"
                    ></ListItem>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>
                  <BadgeDollarSign className="h-6 w-6" />
                  Accounts & Finance
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="grid gap-2 md:w-[400px] md:grid-cols-1 lg:w-[500px] ">
                    <ListItem
                      href="/accounts/payroll"
                      icon={<Coins />}
                      title="Manage Payroll"
                      className="hover:bg-slate-50 dark:hover:bg-gray-700"
                    ></ListItem>
                    <ListItem
                      href="/accounts/invoices"
                      icon={<WalletCards />}
                      title="Manage Invoices"
                      className="hover:bg-slate-50 dark:hover:bg-gray-700"
                    ></ListItem>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </NavigationMenu>
        </div>
      )}
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { icon: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink className="overflow-y-auto" asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none ml-4 p-1 rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="flex items-center">
            <div className="mr-2 text-slate-600">{icon}</div>
            <div className="text-sm text-slate-600 leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default MainNavResponsive;
