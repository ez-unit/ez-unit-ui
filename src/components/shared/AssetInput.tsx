'use client';

import { ASSETS, EAsset, TBalanceNetwork } from '@/constants/Assets';
import {
  useGetHyperCoreBalances,
  useGetNativeBalances,
  useHyperEvmBalances,
} from '@/hooks/read/useAssetBalances';
import { useAssetPrices } from '@/hooks/read/useAssetPrices';
import { numbroFormat } from '@/utils/format';
import { handleInputChange } from '@/utils/handleInputChange';
import {
  HStack,
  Input,
  InputGroup,
  StackProps,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { formatUnits } from 'viem';
import AssetSelect from './AssetSelect';
import { AssetIcon } from './Icons';

interface AssetInputProps extends StackProps {
  value: string;
  options: EAsset[];
  asset: EAsset;
  disabled?: boolean;
  color?: string;
  borderColor?: string;
  customLeftLabel?: React.ReactNode;
  hideBalance?: boolean;
  balanceDisabled?: boolean;
  hideBottom?: boolean;
  bottomTextColor?: string;
  balanceNetwork: TBalanceNetwork;
  setValue: (value: string) => void;
  setAsset: (asset: EAsset) => void;
}
export const AssetInput = ({
  value,
  options,
  asset,
  disabled,
  customLeftLabel,
  color,
  borderColor = '{colors.card.border}',
  hideBalance,
  hideBottom,
  balanceDisabled,
  bottomTextColor,
  balanceNetwork,

  setValue,
  setAsset,
  ...props
}: AssetInputProps) => {
  const { data: assetPrices } = useAssetPrices();
  const { data: hyperEvmBalances } = useHyperEvmBalances();
  const { data: hyperCoreBalances } = useGetHyperCoreBalances();
  const { data: nativeBalances } = useGetNativeBalances();

  const balance = useMemo(() => {
    if (balanceNetwork === 'evm') {
      return hyperEvmBalances[asset];
    } else if (balanceNetwork === 'core') {
      return hyperCoreBalances[asset];
    } else if (balanceNetwork === 'native') {
      return nativeBalances[asset];
    }
    return null;
  }, [
    balanceNetwork,
    hyperEvmBalances,
    hyperCoreBalances,
    nativeBalances,
    asset,
  ]);

  const setMax = useCallback(() => {
    if (balance?.formatted) {
      setValue(formatUnits(balance?.raw ?? 0n, ASSETS[asset].decimals));
    }
  }, [balance, asset, setValue]);

  return (
    <VStack
      gap="16px"
      bg="card.background"
      border={`1px solid ${borderColor}`}
      borderRadius="8px"
      p={hideBottom ? '6px 1rem 6px 1rem' : '16px'}
      mt={{ base: '0.25rem', md: '0' }}
      {...props}
    >
      <InputGroup
        flex="1"
        mt="0"
        zIndex="auto"
        endElement={
          options.length > 1 ? (
            <AssetSelect value={asset} options={options} setAsset={setAsset} />
          ) : (
            <AssetBubble
              asset={asset}
              color={color}
              borderColor={borderColor}
            />
          )
        }
      >
        <Input
          height={{ base: '40px', md: '36px' }}
          fontSize={{ base: '16px', md: '24px' }}
          placeholder="0"
          focusRing="none"
          border="none"
          value={value}
          _disabled={{
            cursor: 'default',
          }}
          color={color}
          disabled={!!disabled}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange({
              value: e.target.value,
              decimals: ASSETS[asset].decimals,
              callback: setValue,
            });
          }}
        />
      </InputGroup>
      {!hideBottom && (
        <HStack
          w="100%"
          justifyContent="space-between"
          pr="4px"
          color={bottomTextColor || 'text.secondary'}
          fontSize={{ base: '12px', md: '16px' }}
        >
          {customLeftLabel || (
            <Text>
              $
              {numbroFormat(Number(value) * assetPrices[asset], {
                mantissa: 2,
                average: false,
                thousandSeparated: true,
                trimMantissa: false,
              })}
            </Text>
          )}
          {!hideBalance && (
            <Text
              _hover={
                !balanceDisabled
                  ? { color: 'text.primary', cursor: 'pointer' }
                  : {}
              }
              onClick={!balanceDisabled ? setMax : undefined}
            >
              Balance: {balance?.formatted}
            </Text>
          )}
        </HStack>
      )}
    </VStack>
  );
};

interface AssetBubbleProps {
  asset: EAsset;
  color?: string;
  borderColor?: string;
}

const AssetBubble = ({
  asset,
  color = 'text.primary',
  borderColor,
}: AssetBubbleProps) => {
  return (
    <HStack
      border="1px solid {colors.card.border}"
      borderColor={borderColor}
      borderRadius="18px"
      p="6px"
      pr="12px"
      bg="assetSelect.background"
      zIndex="1"
    >
      <AssetIcon asset={asset} w="22px" h="22px" />
      <Text fontSize="16px" fontWeight="600" color={color}>
        {asset}
      </Text>
    </HStack>
  );
};
