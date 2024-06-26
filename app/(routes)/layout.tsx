import { MainNav } from '@/components/main-nav';
import Sidebar from '@/components/sidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Toaster } from '@/components/ui/toaster';
import AuthProvider from '@/providers/authProvider';
import { ThemeProvider } from '@/providers/themeProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster as SonnerToaster } from 'sonner';
import ReduxProvider from '../redux/provider';

import ResponsiveSidebar from '@/components/responsive-sidebar';
import { ModalProvider } from '@/providers/modalProvider';
import { QueryProvider } from '@/providers/queryProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AlignJustify } from 'lucide-react';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Organization Management System',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} overflow-hidden`}>
        {/* <SocketProvider> */}
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
          <AuthProvider>
            <QueryProvider>
              <ReduxProvider>
                <div className='flex h-screen overflow-hidden  bg-[#eef5f9] dark:bg-slate-800'>
                  <div className='md:hidden'>
                    <Sheet>
                      <SheetTrigger>
                        <AlignJustify className='fixed top-5 left-5' />
                      </SheetTrigger>
                      <SheetContent side='left'>
                        <ResponsiveSidebar />
                      </SheetContent>
                    </Sheet>
                  </div>

                  <div className='hidden md:block'>
                    <Sidebar />
                  </div>
                  {/* <div className='flex flex-col md:container w-full mx-auto overflow-x-hidden'> */}
                  <div className='md:container flex flex-col w-full mx-auto'>
                    <div className='md:p-10'>
                      <MainNav />
                    </div>
                    <div className='flex-grow overflow-x-auto overflow-y-auto '>
                      {children}
                    </div>
                  </div>
                </div>
                <Toaster />
                <SonnerToaster />
                <ModalProvider />
                <SpeedInsights />
              </ReduxProvider>
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
        {/* </SocketProvider> */}
      </body>
    </html>
  );
}
