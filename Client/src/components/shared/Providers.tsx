import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

type Props = { children: ReactNode };

export default function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        {children}
      </QueryParamProvider>
    </QueryClientProvider>
  );
}
