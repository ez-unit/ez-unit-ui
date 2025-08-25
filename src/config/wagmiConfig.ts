import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  braveWallet,
  coinbaseWallet,
  frameWallet,
  injectedWallet,
  metaMaskWallet,
  phantomWallet,
  rabbyWallet,
  rainbowWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { createConfig, http } from 'wagmi';

import { NETWORK } from '@/config/networks';
import { ENV_WC_PROJECT_ID } from '@/constants/Env';
import { mainnet } from 'viem/chains';

/** Wallet Connectors
 * @returns The connectors
 */
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Wallets',
      wallets: [
        injectedWallet,
        metaMaskWallet,
        rabbyWallet,
        frameWallet,
        braveWallet,
        phantomWallet,
        trustWallet,
        coinbaseWallet,
        rainbowWallet,
      ],
    },
  ],
  {
    appName: 'Hyperliquid Names',
    projectId: ENV_WC_PROJECT_ID,
  }
);

/** Wagmi Config
 * @returns The wagmi config
 */
export const wagmiConfig = createConfig({
  chains: [NETWORK, mainnet],
  transports: {
    [NETWORK.id]: http(),
  },
  connectors,
});
