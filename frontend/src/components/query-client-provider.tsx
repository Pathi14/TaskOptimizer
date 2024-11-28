'use client';
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
}
