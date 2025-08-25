'use client';
import { wagmiConfig } from '@/config/wagmiConfig';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { TransactionProvider } from '@/contexts/TransactionContext';
import { WagmiProvider } from 'wagmi';
export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  const dt = darkTheme({
    overlayBlur: 'small',
    accentColor: '#5ea9ff',
    accentColorForeground: '#000000',
    borderRadius: 'large',
  });
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={{
            ...dt,
            colors: {
              ...dt.colors,
              modalBackground: '#323341cf',
            },
          }}
        >
          <TransactionProvider>{children}</TransactionProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
