import { MainNav } from "@/components/main-nav";
import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/providers/authProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReduxProvider from "../redux/provider";
import "./globals.css";
import { ThemeProvider } from "@/providers/themeProvider";

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <ReduxProvider>
              <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <div className="container flex flex-col w-full overflow-x-hidden">
                  <MainNav />
                  <div className="flex-grow overflow-x-auto overflow-y-auto">
                    {children}
                  </div>
                </div>
              </div>
              <Toaster />
            </ReduxProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}