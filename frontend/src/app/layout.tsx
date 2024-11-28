import type { Metadata } from 'next';
import './globals.css';
import { QueryClientProvider } from '@/components/query-client-provider';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppNav } from '@/components/app-nav';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <QueryClientProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="overflow-hidden">
              <AppNav />
              <main className="px-8 py-8">{children}</main>
            </SidebarInset>
          </SidebarProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
