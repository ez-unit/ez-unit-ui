import * as hl from '@nktkas/hyperliquid';
import { SpotSendParameters } from '@nktkas/hyperliquid';
import { useState } from 'react';
import { createWalletClient, custom } from 'viem';
import { useAccount, useWalletClient } from 'wagmi';

export const useSpotSend = () => {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const spotSend = async (params: SpotSendParameters) => {
    if (!isConnected || !address || !walletClient) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create HyperLiquid wallet from wagmi wallet client
      const hyperLiquidWallet = createWalletClient({
        account: address,
        transport: custom(walletClient.transport),
      });

      // Initialize HyperLiquid transport (HTTP for mainnet)
      const transport = new hl.HttpTransport({
        isTestnet: false,
      });

      // Create ExchangeClient with the wallet
      const exchangeClient = new hl.ExchangeClient({
        wallet: hyperLiquidWallet,
        transport,
        isTestnet: false,
      });

      // Execute spot send
      const result = await exchangeClient.spotSend({
        destination: params.destination,
        token: params.token,
        amount: params.amount,
      });

      return result;
    } catch (err) {
      console.log('err', err);
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    spotSend,
    isLoading,
    error,
  };
};
