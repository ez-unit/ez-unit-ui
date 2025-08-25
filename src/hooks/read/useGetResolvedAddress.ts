import { TNetwork } from '@/constants/Assets';
import { validateAddress } from '@/utils/validateAddress';
import { useMemo, useState } from 'react';
import { namehash, zeroHash } from 'viem';
import { ELinkedAddresses } from './hln/types';
import { useGetNameData } from './hln/useGetNameData';

export const useGetResolvedAddress = (network: TNetwork) => {
  const [withdrawAddressOrHLName, setWithdrawAddressOrHLName] = useState('');

  const isWithdrawAddressValid = useMemo(() => {
    return validateAddress(withdrawAddressOrHLName, network);
  }, [withdrawAddressOrHLName, network]);

  const isHLName = useMemo(() => {
    return withdrawAddressOrHLName.endsWith('.hl');
  }, [withdrawAddressOrHLName]);

  const nameHash = useMemo(() => {
    if (isHLName) {
      return namehash(withdrawAddressOrHLName.toLowerCase());
    }
    return zeroHash;
  }, [withdrawAddressOrHLName, isHLName]);

  const LinkedAddressId = useMemo(() => {
    switch (network) {
      case 'bitcoin':
        return ELinkedAddresses.BTC;
      case 'solana':
        return ELinkedAddresses.SOL;
      case 'ethereum':
        return ELinkedAddresses.ETH;
      case 'spl':
        return ELinkedAddresses.SOL;
      default:
        return null;
    }
  }, [network]);

  const { data: nameData } = useGetNameData(nameHash);

  const resolvedAddress = useMemo(() => {
    if (!LinkedAddressId) return null;
    if (isWithdrawAddressValid) return withdrawAddressOrHLName; // if the withdraw address is valid, return it
    if (
      isHLName && // if it's a HL name
      nameData && // if we have name data
      nameData.textRecords && // if we have text records
      nameData.textRecords.chainAddresses[LinkedAddressId] && // if the chain address is set
      validateAddress(
        nameData.textRecords.chainAddresses[LinkedAddressId],
        network
      ) // if the chain address is valid
    ) {
      return nameData.textRecords.chainAddresses[LinkedAddressId]; // return the chain address
    }
    return null;
  }, [nameData, isWithdrawAddressValid, isHLName, LinkedAddressId]);
  return {
    withdrawAddressOrHLName,
    isWithdrawAddressValid,
    resolvedAddress,
    isHLName,
    nameHash,
    nameData,
    setWithdrawAddressOrHLName,
  };
};
