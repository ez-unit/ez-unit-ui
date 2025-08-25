import { unitSdkClient } from '@/clients/UnitSdkClient';
import { Chain } from '@/lib/unit-sdk';
import { useQuery } from '@tanstack/react-query';
import { type Address } from 'viem';

interface IUseGetWithdrawalAddressParams {
  dst_addr: string | null;
  dst_chain: Chain;
}
export const useGetWithdrawalAddress = ({
  dst_addr,
  dst_chain,
}: IUseGetWithdrawalAddressParams) => {
  const { data, isFetching, error } = useQuery({
    queryKey: ['withdrawalAddress', dst_addr, dst_chain],
    queryFn: () => fetchWithdrawalAddress({ dst_addr, dst_chain }),
    enabled: !!dst_addr,
    initialData: null,
  });
  return { data, isFetching, error };
};

async function fetchWithdrawalAddress({
  dst_addr,
  dst_chain,
}: IUseGetWithdrawalAddressParams) {
  if (!dst_addr) {
    return null;
  }
  const asset =
    dst_chain === 'solana' ? 'sol' : dst_chain === 'ethereum' ? 'eth' : 'btc';
  const res = await unitSdkClient.generateAddress({
    src_chain: 'hyperliquid',
    asset,
    dst_addr,
    dst_chain,
  });
  return res.data.address as Address;
}
