import Sidebar from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employee Profile",
  description: "Advanced form example using react-hook-form and Zod.",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row mr-4 mx-auto">
      <div className="lg:w-1/3 lg:p-10">
        <div className="space-y-2">
          <h2 className="text-2xl mt-4 font-bold tracking-tight">
            Employee Profile
          </h2>
          <p className="text-muted-foreground">
            View your personal details.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="lg:w-2/3">
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <div className="flex-1 lg:max-w-screen-2xl">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
