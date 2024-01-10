import { MainNav } from "@/components/main-nav";
import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/providers/authProvider";
import { ThemeProvider } from "@/providers/themeProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReduxProvider from "../redux/provider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import "./globals.css";
import { AlignJustify } from "lucide-react";
import ResponsiveSidebar from "@/components/responsive-sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sphiria Digita Studio | EMS",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} overflow-hidden`}>
        {/* <SocketProvider> */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <ReduxProvider>
              <div className="flex h-screen overflow-hidden  bg-[#eef5f9] dark:bg-slate-800">
                <div className="md:hidden">
                  <Sheet>
                    <SheetTrigger>
                      <AlignJustify className="relative top-5 left-5" />
                    </SheetTrigger>
                    <SheetContent side="left">
                      <ResponsiveSidebar />
                    </SheetContent>
                  </Sheet>
                </div>

                <div className="hidden md:block">
                  <Sidebar />
                </div>
                <div className="md:container flex flex-col w-full overflow-x-hidden">
                  <MainNav />
                  <div className="flex-grow overflow-x-auto overflow-y-auto ">
                    {children}
                  </div>
                </div>
              </div>
              <Toaster />
            </ReduxProvider>
          </AuthProvider>
        </ThemeProvider>
        {/* </SocketProvider> */}
      </body>
    </html>
  );
}
