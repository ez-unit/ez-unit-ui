import { unitSdkClient } from '@/clients/UnitSdkClient';
import { TNetwork } from '@/constants/Assets';
import { useQuery } from '@tanstack/react-query';
import { Address } from 'viem';

export const useGetDepositAddresses = (address: Address | undefined) => {
  const { data, isFetching, error } = useQuery({
    queryKey: ['depositAddresses', address ?? null],
    queryFn: () => fetchAddresses(address),
    enabled: !!address,
  });
  return { data, isFetching, error };
};

async function fetchAddresses(address: Address | undefined) {
  if (!address) {
    return null;
  }

  const [solDepositAddress, ethDepositAddress, btcDepositAddress] =
    await Promise.all([
      unitSdkClient.generateSolanaDepositAddress(address),
      unitSdkClient.generateEthereumDepositAddress(address),
      unitSdkClient.generateBitcoinDepositAddress(address),
    ]);

  return {
    bitcoin: btcDepositAddress.data.address,
    ethereum: ethDepositAddress.data.address,
    solana: solDepositAddress.data.address,
    spl: solDepositAddress.data.address,
  } as Record<TNetwork, string>;
}
