'use client';
import { useAuth } from '@/hooks/use-auth';
import { redirect } from 'next/navigation';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    redirect('/login');
  }

  return <>{children}</>;
}
