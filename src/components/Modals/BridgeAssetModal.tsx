'use client';
import { EAsset } from '@/constants/Assets';
import { useTransactionContext } from '@/contexts/TransactionContext';
import { useBridge } from '@/hooks/write/useBridge';
import { handleInputChange } from '@/utils/handleInputChange';
import {
  CloseButton,
  Dialog,
  HStack,
  Portal,
  Text,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { AssetInput } from '../shared/AssetInput';
import { AssetIcon, IconSwitch } from '../shared/Icons';
import { EAlertType, SAlert } from '../shared/SAlert';
import { SButton } from '../shared/SButton';

export const BridgeAssetModal = () => {
  const { selectedBridgeAsset, setSelectedBridgeAsset, setAssetSymbol } =
    useTransactionContext();

  const {
    fromNetwork,
    toNetwork,
    switchNetwork,
    bridgeAsset,
    setBridgeAmount,
    bridgeAmount,
    buttonState,
  } = useBridge();

  return (
    <HStack wrap="wrap" gap="4">
      <Dialog.Root
        placement="center"
        motionPreset="slide-in-bottom"
        lazyMount
        open={!!selectedBridgeAsset}
        onOpenChange={(e) => {
          if (!e.open) {
            setSelectedBridgeAsset(null);
          }
        }}
      >
        <Portal>
          <Dialog.Backdrop
            backdropFilter="blur(10px)"
            backgroundColor="dialog.backdrop"
          />
          <Dialog.Positioner>
            {selectedBridgeAsset && bridgeAsset && (
              <Dialog.Content p="1rem">
                <Dialog.Header>
                  <Dialog.Title
                    fontSize="22px"
                    fontWeight="500"
                    color="text.primary"
                    as={HStack}
                  >
                    Bridge{' '}
                    <AssetIcon w="24px" h="24px" asset={selectedBridgeAsset} />
                    {bridgeAsset.symbol}
                  </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body
                  color="text.primary"
                  mt="1rem"
                  as={VStack}
                  alignItems="flex-start"
                >
                  <SAlert
                    type={EAlertType.Info}
                    my="0.5rem"
                    w="full"
                    justify="center"
                  >
                    <Text lineHeight="1.5">
                      Bridging assets between Core and EVM uses the native
                      system addresses. More info{' '}
                      <Link
                        href="https://hyperliquid.gitbook.io/hyperliquid-docs/onboarding/how-to-use-the-hyperevm#how-do-i-move-assets-to-and-from-the-hyperevm"
                        target="_blank"
                        style={{ textDecoration: 'underline' }}
                      >
                        here
                      </Link>
                    </Text>
                  </SAlert>
                  <HStack px="5px" w="full" justify="space-between">
                    <HStack>
                      <Text mr="4px">From: </Text>
                      <AssetIcon w="18px" h="18px" asset={EAsset.HYPE} />
                      <Text>Hyper{fromNetwork.toUpperCase()}</Text>
                    </HStack>
                    <HStack
                      _hover={{ cursor: 'pointer' }}
                      onClick={switchNetwork}
                    >
                      <IconSwitch />
                      <Text>Hyper{toNetwork.toUpperCase()}</Text>
                    </HStack>
                  </HStack>
                  <AssetInput
                    zIndex="3"
                    asset={selectedBridgeAsset}
                    value={bridgeAmount}
                    options={[
                      EAsset.HYPE,
                      EAsset.BTC,
                      EAsset.ETH,
                      EAsset.SOL,
                      EAsset.FART,
                      EAsset.PUMP,
                    ]}
                    balanceNetwork={fromNetwork}
                    setValue={(value) =>
                      handleInputChange({
                        value,
                        decimals: bridgeAsset.decimals,
                        callback: setBridgeAmount,
                      })
                    }
                    setAsset={setSelectedBridgeAsset}
                    w="full"
                  />
                  <HStack pl="5px" mt="1rem">
                    <Text mr="4px">To: </Text>
                    <AssetIcon w="18px" h="18px" asset={EAsset.HYPE} />
                    <Text>Hyper{toNetwork.toUpperCase()}</Text>
                  </HStack>

                  <AssetInput
                    zIndex="2"
                    asset={selectedBridgeAsset}
                    value={bridgeAmount}
                    options={[]}
                    balanceDisabled
                    disabled
                    balanceNetwork={toNetwork}
                    setValue={() => {}}
                    setAsset={() => {}}
                    w="full"
                  />
                </Dialog.Body>

                <Dialog.Footer mt="1rem">
                  <SButton w="full" size="lg" {...buttonState}>
                    {buttonState.loadingText}
                  </SButton>
                </Dialog.Footer>

                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            )}
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </HStack>
  );
};
