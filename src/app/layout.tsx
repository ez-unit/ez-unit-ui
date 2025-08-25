import AppLayout from '@/components/layout/AppLayout';
import AppProviders from '@/components/providers/AppProviders';
import { Provider } from '@/components/ui/provider';
import type { Metadata } from 'next';
import { Host_Grotesk } from 'next/font/google';
import './globals.css';
const hostGrotesk = Host_Grotesk({
  variable: '--font-host-grotesk',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'EZ UNIT',
  description: 'Community frontend for HyperUnit',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="EZ UNIT" />
      </head>
      <body className={`${hostGrotesk.variable}`}>
        <Provider>
          <AppProviders>
            <AppLayout>{children}</AppLayout>
          </AppProviders>
        </Provider>
      </body>
    </html>
  );
}
