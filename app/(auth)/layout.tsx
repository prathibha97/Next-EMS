import PasswordResetModal from '@/components/modals/password-reset-modal';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ReduxProvider from '../redux/provider';
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
        <ReduxProvider>
          <div className='flex-grow overflow-x-auto overflow-y-auto'>
            {children}
            <PasswordResetModal />
          </div>
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
