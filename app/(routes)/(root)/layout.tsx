import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sphiria Digita Studio | EMS',
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
        <div className='flex-grow overflow-x-auto overflow-y-auto'>
          {children}
        </div>
      </body>
    </html>
  );
}