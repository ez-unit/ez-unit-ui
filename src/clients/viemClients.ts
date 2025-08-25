import { hyperevmMainnet as hyperEvmMainnet } from '@/config/networks';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

export const viemEthClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export const viemHyperEvmClient = createPublicClient({
  chain: hyperEvmMainnet,
  transport: http(),
});
