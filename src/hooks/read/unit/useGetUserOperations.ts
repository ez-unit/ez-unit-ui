import { unitSdkClient } from '@/clients/UnitSdkClient';
import { GetOperationsResponse } from '@/lib/unit-sdk';
import { useQuery } from '@tanstack/react-query';
import { Address } from 'viem';
import { useAccount } from 'wagmi';

export const useGetUserOperations = () => {
  const { address } = useAccount();
  const { data, isFetching, error } = useQuery({
    queryKey: ['userOperations', address ?? null],
    queryFn: () => fetchUserOperations(address),
    enabled: !!address,
    refetchInterval: 10000,
    initialData: initialData,
  });
  return { data, isFetching, error };
};

const initialData = {
  operations: [],
  addresses: [],
} as GetOperationsResponse;

async function fetchUserOperations(address: Address | undefined) {
  if (!address) return initialData;
  const response = await unitSdkClient.getOperations(address);
  return response.data;
}
