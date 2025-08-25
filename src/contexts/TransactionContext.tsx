'use client';
import { ASSETS, EAsset, TAsset, TNetwork } from '@/constants/Assets';
import { useGetDepositAddresses } from '@/hooks/read/unit/useGetDepositAddresses';
import { useGetWithdrawalAddress } from '@/hooks/read/unit/useGetWithdrawalAddress';
import { useGetResolvedAddress } from '@/hooks/read/useGetResolvedAddress';
import { useSpotSend } from '@/hooks/write/useSpotSend';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Address, zeroAddress } from 'viem';
import { useAccount } from 'wagmi';

interface TransactionContextType {
  mode: 'deposit' | 'withdraw' | 'bridge';
  assetSymbol: EAsset;
  amountString: string;
  depositDestinationAddress: Address | undefined;
  asset: TAsset;
  depositAddress: string | null;
  withdrawAddressOrHLName: string;
  isWithdrawAddressValid: boolean;
  withdrawalAddress: Address | null;
  resolvedAddress: string | null;
  networkName: string;
  buttonState: IButtonState;
  selectedBridgeAsset: EAsset | null; // todo move to global state
  isHLName: boolean;
  setMode: (mode: 'deposit' | 'withdraw' | 'bridge') => void;
  setAssetSymbol: (asset: EAsset) => void;
  setAmountString: (amount: string) => void;
  setWithdrawAddressOrHLName: (address: string) => void;
  setSelectedBridgeAsset: (asset: EAsset | null) => void; // todo move to global state
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const { address } = useAccount();
  const [selectedBridgeAsset, setSelectedBridgeAsset] = useState<EAsset | null>(
    null
  ); // todo move to global state

  const [mode, setMode] = useState<'deposit' | 'withdraw' | 'bridge'>(
    'withdraw'
  );
  const [assetSymbol, setAssetSymbol] = useState<EAsset>(EAsset.BTC);
  const asset = ASSETS[assetSymbol];

  const networkName = (
    asset.network === 'spl' ? 'solana' : asset.network
  ).toUpperCase();

  const [amountString, setAmountString] = useState('');

  const depositDestinationAddress = address;

  const {
    withdrawAddressOrHLName,
    setWithdrawAddressOrHLName,
    isWithdrawAddressValid,
    resolvedAddress,
    isHLName,
    nameData,
  } = useGetResolvedAddress(asset.network);

  const { data: withdrawalAddress } = useGetWithdrawalAddress({
    dst_addr: resolvedAddress,
    dst_chain: asset.network === 'spl' ? 'solana' : asset.network,
  });

  const { data: depositAddresses } = useGetDepositAddresses(address); // todo include .HL resolution

  // reset withdrawal address when asset network changes
  useEffect(() => {
    if (isHLName) return; // don't reset if it's a HL name
    const isSolanaNetwork = (network: TNetwork) =>
      network === 'solana' || network === 'spl';
    const prevIsSolana = isSolanaNetwork(asset.network);
    const nextIsSolana = isSolanaNetwork(asset.network);

    if (!(prevIsSolana && nextIsSolana)) {
      setWithdrawAddressOrHLName('');
    }
  }, [asset.network]);

  const { spotSend, isLoading: spotSendLoading } = useSpotSend();

  const depositAddress = useMemo(() => {
    if (!depositAddresses) return null;
    return depositAddresses[asset.network];
  }, [depositAddresses, asset.network]);

  const buttonState = useMemo(() => {
    if (mode === 'withdraw') {
      switch (true) {
        case spotSendLoading: {
          return {
            loadingText: 'Withdrawing...',
            onClick: undefined,
            disabled: true,
          };
        }
        case !!nameData &&
          !!nameData.owner &&
          nameData.owner !== zeroAddress &&
          !withdrawalAddress: // if the name is owned and no withdrawal address is found
          return {
            loadingText: 'HL Name exists, but no linked address found',
            onClick: undefined,
            disabled: true,
          };
        case !resolvedAddress:
          return {
            loadingText: 'Please enter a valid address or .hl name',
            onClick: undefined,
            disabled: true,
          };
        case !amountString:
          return {
            loadingText: 'Please enter an amount',
            onClick: undefined,
            disabled: true,
          };
        case Number(amountString) < asset.minAmount:
          return {
            loadingText: `Minimum withdraw is ${asset.minAmount} ${assetSymbol}`,
            onClick: undefined,
            disabled: true,
          };
        default:
          return {
            loadingText: 'Withdraw',
            onClick: () => {
              if (!asset.hyperCoreAssetId || !withdrawalAddress) return;
              spotSend({
                token: asset.hyperCoreAssetId,
                destination: withdrawalAddress,
                amount: amountString,
              });
            },
          };
      }
    } else {
      return {
        loadingText: '...',
        onClick: undefined,
      };
    }
  }, [
    mode,
    isWithdrawAddressValid,
    amountString,
    asset.minAmount,
    assetSymbol,
    spotSendLoading,
    nameData,
    withdrawalAddress,
  ]);

  const value = {
    mode,
    assetSymbol,
    amountString,
    depositAddresses,
    depositDestinationAddress,
    depositAddress,
    asset,
    withdrawAddressOrHLName,
    isWithdrawAddressValid,
    withdrawalAddress,
    networkName,
    resolvedAddress,
    buttonState,
    isHLName,
    setMode,
    setAssetSymbol,
    setAmountString,
    setWithdrawAddressOrHLName,
    selectedBridgeAsset, // todo move to global state
    setSelectedBridgeAsset, // todo move to global state
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactionContext() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }
  return context;
}
