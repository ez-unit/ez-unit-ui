import { wagmiConfig } from '@/config/wagmiConfig';
import { ASSETS, TBalanceNetwork } from '@/constants/Assets';
import { useTransactionContext } from '@/contexts/TransactionContext';
import { useCallback, useMemo, useState } from 'react';
import { erc20Abi, parseUnits } from 'viem';
import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from 'wagmi/actions';
import {
  useGetHyperCoreBalances,
  useHyperEvmBalances,
} from '../read/useAssetBalances';
import { useSpotSend } from './useSpotSend';

export const useBridge = () => {
  const { selectedBridgeAsset } = useTransactionContext();
  const { data: coreBalances, refetch: refetchCoreBalances } =
    useGetHyperCoreBalances();
  const { data: evmBalances, refetch: refetchEvmBalances } =
    useHyperEvmBalances();
  const [isLoading, setIsLoading] = useState(false);

  const bridgeAsset = selectedBridgeAsset && ASSETS[selectedBridgeAsset];

  const [fromNetwork, setFromNetwork] = useState<TBalanceNetwork>('core');
  const toNetwork = (
    fromNetwork === 'core' ? 'evm' : 'core'
  ) as TBalanceNetwork;

  const [bridgeAmount, setBridgeAmount] = useState<string>('');

  const isInsufficientBalance = useMemo(() => {
    if (!selectedBridgeAsset) return false;
    switch (fromNetwork) {
      case 'core':
        return (
          Number(bridgeAmount) > coreBalances[selectedBridgeAsset].decimals
        );
      case 'evm':
        return Number(bridgeAmount) > evmBalances[selectedBridgeAsset].decimals;
      default:
        return false;
    }
  }, [
    selectedBridgeAsset,
    bridgeAmount,
    fromNetwork,
    coreBalances,
    evmBalances,
  ]);

  const { spotSend, isLoading: spotSendLoading, error } = useSpotSend();

  const coreToEvmBridge = useCallback(async () => {
    if (
      !bridgeAsset ||
      !bridgeAsset.bridgeAddress ||
      !bridgeAsset.hyperCoreAssetId
    )
      return;
    await spotSend({
      destination: bridgeAsset.bridgeAddress,
      token: bridgeAsset.hyperCoreAssetId,
      amount: bridgeAmount,
    });
  }, [bridgeAsset, bridgeAmount, spotSend]);

  const evmToCoreBridge = useCallback(async () => {
    if (
      !bridgeAsset ||
      !bridgeAsset.hyperEvmAddress ||
      !bridgeAsset.hyperCoreAssetId ||
      !bridgeAsset.bridgeAddress
    )
      return;
    const { request } = await simulateContract(wagmiConfig, {
      address: bridgeAsset.hyperEvmAddress,
      abi: erc20Abi,
      functionName: 'transfer',
      args: [
        bridgeAsset.bridgeAddress,
        parseUnits(bridgeAmount, bridgeAsset.decimals),
      ],
    });
    const hash = await writeContract(wagmiConfig, request);
    const { status } = await waitForTransactionReceipt(wagmiConfig, {
      hash,
    });
  }, [bridgeAsset, bridgeAmount, refetchCoreBalances, refetchEvmBalances]);

  const reset = useCallback(() => {
    setIsLoading(false);
    setBridgeAmount('');
    refetchCoreBalances();
    refetchEvmBalances();
  }, [refetchCoreBalances, refetchEvmBalances, setBridgeAmount]);

  const bridge = useCallback(async () => {
    if (fromNetwork === 'core') {
      setIsLoading(true);
      try {
        await coreToEvmBridge();
      } catch (error) {
        console.error(error);
      } finally {
        reset();
      }
    } else {
      setIsLoading(true);
      try {
        await evmToCoreBridge();
      } catch (error) {
        console.error(error);
      } finally {
        reset();
      }
    }
  }, [fromNetwork, coreToEvmBridge, evmToCoreBridge]);

  const switchNetwork = () => {
    setFromNetwork(toNetwork);
  };

  const buttonState: IButtonState = useMemo(() => {
    switch (true) {
      case !bridgeAsset ||
        !bridgeAsset.bridgeAddress ||
        !bridgeAsset.hyperCoreAssetId ||
        !selectedBridgeAsset:
        return {
          loadingText: '',
          disabled: true,
        };
      case isInsufficientBalance:
        return {
          loadingText: 'Insufficient balance',
          loading: false,
          disabled: true,
        };
      case !bridgeAmount:
        return {
          loadingText: 'Please enter an amount',
          loading: false,
          disabled: true,
        };
      case isLoading:
        return {
          loadingText: 'Bridging...',
          onClick: bridge,
          loading: true,
        };
      default:
        return {
          loadingText: 'Bridge',
          onClick: bridge,
          loading: false,
        };
    }
  }, [
    bridgeAsset,
    bridgeAmount,
    isLoading,
    coreBalances,
    evmBalances,
    selectedBridgeAsset,
    isInsufficientBalance,
  ]);

  return {
    bridgeAsset,
    fromNetwork,
    toNetwork,
    bridgeAmount,
    buttonState,
    setBridgeAmount,
    setFromNetwork,
    switchNetwork,
  };
};
