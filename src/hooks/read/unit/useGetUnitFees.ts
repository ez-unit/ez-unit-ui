import { unitSdkClient } from '@/clients/UnitSdkClient';
import { useQuery } from '@tanstack/react-query';

export const useGetUnitFees = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['unit-fees'],
    queryFn: () => getUnitFees(),
    refetchInterval: 10000,
    initialData: null,
  });
  return { data, isLoading, error };
};

const getUnitFees = async () => {
  const response = await unitSdkClient.estimateFees();
  return response.data;
};
