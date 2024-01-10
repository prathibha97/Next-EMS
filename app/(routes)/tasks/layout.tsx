import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Tasks",
  description: "Advanced form example using react-hook-form and Zod.",
};

interface TasksLayoutProps {
  children: React.ReactNode;
}

export default function TasksLayout({ children }: TasksLayoutProps) {
  return (
    <div className="md:container flex flex-col w-full mx-auto">
      <div className="p-4 md:p-10 pb-16">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks assigned for the projects!
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="flex-1 lg:max-w-screen-2xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
