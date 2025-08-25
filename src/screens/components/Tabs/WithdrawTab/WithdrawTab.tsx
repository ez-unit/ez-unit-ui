'use client';
import { AssetInput } from '@/components/shared/AssetInput';
import { AssetIcon, HlnLogo, IconWallet } from '@/components/shared/Icons';
import { EAlertType, SAlert } from '@/components/shared/SAlert';
import { SButton } from '@/components/shared/SButton';
import { StackCard } from '@/components/shared/SCard';
import { EAsset } from '@/constants/Assets';
import { useTransactionContext } from '@/contexts/TransactionContext';
import { useGetPrimaryName } from '@/hooks/read/hln/useGetPrimaryName';
import { useGetUnitFees } from '@/hooks/read/unit/useGetUnitFees';
import { useAssetPrices } from '@/hooks/read/useAssetPrices';
import { numbroFormat } from '@/utils/format';
import { Box, HStack, Input, Stack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { useAccount } from 'wagmi';

export const WithdrawTab = () => {
  const { address } = useAccount();
  const { data: primaryName } = useGetPrimaryName(address);
  const { data: unitFees } = useGetUnitFees();
  const { data: assetPrices } = useAssetPrices();
  const {
    asset,
    assetSymbol,
    amountString,
    withdrawAddressOrHLName,
    isWithdrawAddressValid,
    networkName,
    isHLName,
    resolvedAddress,
    setAssetSymbol,
    setAmountString,
    setWithdrawAddressOrHLName,
    buttonState,
  } = useTransactionContext();

  const withdrawNetworkAsset = useMemo(() => {
    return asset.network === 'spl' || asset.network === 'solana'
      ? EAsset.SOL
      : asset.network === 'bitcoin'
        ? EAsset.BTC
        : asset.network === 'ethereum'
          ? EAsset.ETH
          : null;
  }, [asset.network]);

  useEffect(() => {
    setAmountString('');
  }, [asset]);

  return (
    <Stack
      w="full"
      gap="2rem"
      align="center"
      direction={{ base: 'column', lg: 'row' }}
      px={{ base: '0.5rem', sm: '1rem', lg: '0' }}
    >
      <VStack w={{ base: 'full', lg: '60%' }} align="flex-start" gap="0.5rem">
        <Text fontWeight="bold" color="text.secondary" ml="6px">
          Withdraw
        </Text>
        <AssetInput
          w="full"
          zIndex="4"
          value={amountString}
          balanceNetwork="core"
          options={[
            EAsset.BTC,
            EAsset.ETH,
            EAsset.SOL,
            EAsset.FART,
            EAsset.PUMP,
            EAsset.BONK,
            EAsset.SPX,
          ]}
          asset={assetSymbol}
          setValue={setAmountString}
          setAsset={setAssetSymbol}
        />
        <HStack w="full" justify="space-between" align="center" mt="0.5rem">
          <Text fontWeight="bold" color="text.secondary" ml="6px" mt="6px">
            To
          </Text>
          <HStack gap="1.5rem">
            {primaryName && (
              <HStack
                color="text.link"
                cursor="pointer"
                onClick={() => {
                  setWithdrawAddressOrHLName(primaryName);
                }}
              >
                <HlnLogo size="14px" />
                <Text>{primaryName}</Text>
              </HStack>
            )}
            {address && asset.network === 'ethereum' && (
              <HStack
                color="text.link"
                cursor="pointer"
                onClick={() => {
                  setWithdrawAddressOrHLName(address);
                }}
              >
                <IconWallet w="12px" h="12px" />
                <Text>Wallet</Text>
              </HStack>
            )}
          </HStack>
        </HStack>
        <VStack
          w="full"
          bg="card.background"
          border="1px solid {colors.card.border}"
          borderRadius="8px"
          py="8px"
          zIndex="3"
        >
          <HStack
            w="full"
            gap="0.5rem"
            justify="space-between"
            mt={{ base: '0.25rem', md: '0' }}
            px="16px"
          >
            <Input
              fontSize="14px"
              fontFamily="mono"
              color="text.green.9"
              value={withdrawAddressOrHLName}
              border="none"
              focusRing="none"
              placeholder="Enter address or .hl name"
              onChange={(e) => setWithdrawAddressOrHLName(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />

            {withdrawNetworkAsset && isWithdrawAddressValid && (
              <AssetIcon asset={withdrawNetworkAsset} />
            )}
            {isHLName && <HlnLogo size="18px" />}
          </HStack>
          {isHLName && resolvedAddress && withdrawNetworkAsset && (
            <HStack
              w="full"
              justify="space-between"
              pb="6px"
              pt="12px"
              borderTop="1px solid {colors.card.border}"
              px="16px"
            >
              <Text fontSize="14px" color="text.primary">
                {resolvedAddress}
              </Text>
              <AssetIcon asset={withdrawNetworkAsset} />
            </HStack>
          )}
        </VStack>
        <StackCard mt="1rem" gap="0.75rem" w="full">
          <HStack justify="space-between" color="yellow.500">
            <Text>Minimum Withdraw Amount</Text>
            <Text textAlign="right">
              {asset.minAmount} {assetSymbol}
            </Text>
          </HStack>
          <HStack justify="space-between">
            <Text>Estimated Time</Text>
            {unitFees && (
              <Text textAlign="right">
                ~{unitFees[asset.network].withdrawalEta}
              </Text>
            )}
          </HStack>
          <HStack justify="space-between">
            <Text>Estimated Network Fee</Text>
            {unitFees && (
              <Text textAlign="right">
                $
                {numbroFormat(
                  (unitFees[asset.network].withdrawalFee /
                    10 ** asset.decimals) *
                    assetPrices[assetSymbol],
                  {
                    mantissa: 2,
                    trimMantissa: true,
                  }
                )}
              </Text>
            )}
          </HStack>
        </StackCard>
        <SButton {...buttonState} w="full">
          <Text>{buttonState.loadingText}</Text>
        </SButton>
      </VStack>

      <StackCard
        px="0.75rem"
        py="1rem"
        alignItems="center"
        justifyContent="space-between"
        direction="column"
        gap="1rem"
        h="full"
        w={{ base: 'full', lg: '40%' }}
      >
        <HStack gap="1rem">
          <Box>
            <IconWallet w="22px" h="22px" />
          </Box>
          <Text lineHeight="1.3">
            You can withdraw your {assetSymbol} to{' '}
            <Text as="span" fontWeight="bold" color="text.unit">
              {networkName} Mainnet
            </Text>{' '}
            to a crypto wallet or exchange account.
          </Text>
        </HStack>
        <SAlert type={EAlertType.Warning} w="full" justifyContent="left">
          <Text fontWeight="bold" lineHeight="1.5">
            Do not send to an address on any other network. Make sure you have
            control of that wallet.
          </Text>
        </SAlert>
        <SAlert type={EAlertType.Error} justifyContent="left">
          <Text fontWeight="bold" lineHeight="1.5">
            You funds will be permanently lost if you send to an address on any
            other network.
          </Text>
        </SAlert>
      </StackCard>
    </Stack>
  );
};
