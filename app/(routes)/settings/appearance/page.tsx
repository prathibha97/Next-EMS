"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { AppearanceForm } from "./appearance-form";

export default function SettingsProfilePage() {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  return (
    <div className="bg-slate-50 md:w-[850px] xl:w-[950px] p-5 rounded-lg dark:bg-gray-800/40">
      <div className="container space-y-6">
        <div>
          <h3 className="text-lg font-medium">Appearance</h3>
          <p className="text-sm text-muted-foreground">
            Customize the appearance of the app. Automatically switch between
            day and night themes.
          </p>
        </div>
        <Separator />
        <AppearanceForm />
      </div>
    </div>
  );
}
