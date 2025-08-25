'use client';
import { wagmiConfig } from '@/config/wagmiConfig';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ENV_PRIVY_APP_ID } from '@/constants/Env';
import { TransactionProvider } from '@/contexts/TransactionContext';
import { PrivyProvider } from '@privy-io/react-auth';
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
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
  const solanaConnectors = toSolanaWalletConnectors({
    shouldAutoConnect: false,
  });
  return (
    <PrivyProvider
      appId={ENV_PRIVY_APP_ID}
      config={{
        loginMethodsAndOrder: {
          primary: ['detected_ethereum_wallets'],
          overflow: [
            'detected_solana_wallets',
            'phantom',
            'solflare',
            'okx_wallet',
            'backpack',
          ],
        },
        appearance: {
          theme: 'dark',
          // accentColor: "#676FFF",
          // logo: "https://your-logo-url",
        },

        // Create embedded wallets for users who don't have a wallet
        // embeddedWallets: {
        //   createOnLogin: 'users-without-wallets',
        // },
        externalWallets: {
          solana: {
            connectors: solanaConnectors,
          },
        },
        solanaClusters: [
          {
            name: 'mainnet-beta',
            rpcUrl: 'https://api.mainnet-beta.solana.com',
          },
        ],
      }}
    >
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
    </PrivyProvider>
  );
}
