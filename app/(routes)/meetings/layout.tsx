import Sidebar from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule or Join a Meeting",
  description: "Advanced form example using react-hook-form and Zod.",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="md:container flex flex-col w-full mx-auto">
      <div className="p-4 md:p-10 pb-16">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">
            Schedule or Join Meetings
          </h2>
          <p className="text-muted-foreground">
            You can schedule or join meetings with Google Meet.
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
