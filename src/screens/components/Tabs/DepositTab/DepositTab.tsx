'use client';
import { AssetInput } from '@/components/shared/AssetInput';
import { CopyInput } from '@/components/shared/CopyInput';
import { QrGenerator } from '@/components/shared/QrGenerator';
import { EAlertType, SAlert } from '@/components/shared/SAlert';
import { StackCard } from '@/components/shared/SCard';
import { EAsset } from '@/constants/Assets';
import { useTransactionContext } from '@/contexts/TransactionContext';
import { useGetUnitFees } from '@/hooks/read/unit/useGetUnitFees';
import { useAssetPrices } from '@/hooks/read/useAssetPrices';
import { numbroFormat } from '@/utils/format';
import { Box, HStack, Stack, Text, VStack } from '@chakra-ui/react';

export const DepositTab = () => {
  const { data: unitFees } = useGetUnitFees();
  const { data: assetPrices } = useAssetPrices();

  const {
    asset,
    assetSymbol,
    amountString,
    depositDestinationAddress,
    depositAddress,
    networkName,
    setAssetSymbol,
    setAmountString,
  } = useTransactionContext();

  return (
    <Stack
      w="full"
      gap="2rem"
      align="center"
      direction={{ base: 'column', lg: 'row' }}
      px={{ base: '0.5rem', sm: '1rem', lg: '0' }}
    >
      <VStack w={{ base: 'full', lg: '50%' }} align="flex-start" gap="0.5rem">
        <Text fontWeight="bold" color="text.secondary" ml="6px">
          Deposit
        </Text>
        <AssetInput
          w="full"
          value={amountString}
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
          hideBalance={assetSymbol === EAsset.BTC}
          balanceNetwork="native"
        />
        <Text fontWeight="bold" color="text.secondary" ml="6px" mt="6px">
          To
        </Text>
        <HStack
          w="full"
          gap="0.5rem"
          bg="card.background"
          border="1px solid {colors.card.border}"
          borderRadius="8px"
          justify="space-between"
          p={'16px'}
          mt={{ base: '0.25rem', md: '0' }}
        >
          <Text fontSize="14px" fontFamily="mono" color="text.green.9">
            {depositDestinationAddress}
          </Text>
          <Box
            border="1px solid"
            borderColor="teal.400/60"
            fontSize="13px"
            color="teal.500"
            px="8px"
            py="8px"
            borderRadius="8px"
            background="teal.500/5"
            userSelect="none"
          >
            HyperCore
          </Box>
        </HStack>
        <StackCard mt="1rem" gap="0.75rem" w="full">
          <HStack justify="space-between" color="yellow.500">
            <Text>Minimum Deposit Amount</Text>
            <Text textAlign="right">
              {asset.minAmount} {assetSymbol}
            </Text>
          </HStack>
          <HStack justify="space-between">
            <Text>Estimated Time</Text>
            {unitFees && (
              <Text textAlign="right">
                ~{unitFees[asset.network].depositEta}
              </Text>
            )}
          </HStack>
          <HStack justify="space-between">
            <Text>Estimated Network Fee</Text>
            {unitFees && (
              <Text textAlign="right">
                $
                {numbroFormat(
                  (unitFees[asset.network].depositFee / 10 ** asset.decimals) *
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
        {assetSymbol === EAsset.BTC && (
          <SAlert
            type={EAlertType.Warning}
            mt="0.5rem"
            w="full"
            fontSize="16px"
            gap="12px"
          >
            <Box>
              <Text>
                Bitcoin Can only be sent from a Bitcoin wallet or exchange.
              </Text>
              <Text mt="0.25rem">
                Please ensure you are sending on the Bitcoin network.
              </Text>
            </Box>
          </SAlert>
        )}
      </VStack>
      {depositAddress && (
        // <AspectRatio ratio={1} >
        //   <Box w="full" h="full">
        <StackCard
          px="0.75rem"
          py="1rem"
          alignItems="center"
          justifyContent="space-between"
          direction="column"
          gap="1rem"
          w={{ base: 'full', lg: '50%' }}
          mt={{ base: '0', lg: '1.5rem' }}
        >
          <VStack w="full" gap="0.5rem">
            <Text fontSize="16px" fontWeight="bold" color="text.primary">
              {`${assetSymbol} Deposit Address - ${networkName} Network`}
            </Text>
            <CopyInput value={depositAddress} w="full" />
          </VStack>
          <VStack w="full" h="full" justifyContent="center">
            <QrGenerator asset={asset} address={depositAddress} />
          </VStack>
          <SAlert type={EAlertType.Warning} w="full" justifyContent="center">
            <Text fontWeight="bold">
              Send at least {asset.minAmount} {assetSymbol} on {networkName}{' '}
              Mainnet
            </Text>
          </SAlert>
        </StackCard>
        //   </Box>
        // </AspectRatio>
      )}
    </Stack>
  );
};
