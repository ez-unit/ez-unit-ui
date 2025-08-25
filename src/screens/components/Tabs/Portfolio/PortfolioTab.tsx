import { AssetIcon } from '@/components/shared/Icons';
import { SButton } from '@/components/shared/SButton';
import { STooltip } from '@/components/shared/STooltip';
import { ASSETS, EAsset } from '@/constants/Assets';
import { useTransactionContext } from '@/contexts/TransactionContext';
import {
  useGetHyperCoreBalances,
  useGetNativeBalances,
  useHyperEvmBalances,
} from '@/hooks/read/useAssetBalances';
import { HStack, Table, Text } from '@chakra-ui/react';

export const PortfolioTab = () => {
  // Fetch all balance types at table level
  const { data: nativeBalances } = useGetNativeBalances();
  const { data: hyperCoreBalances } = useGetHyperCoreBalances();
  const { data: hyperEvmBalances } = useHyperEvmBalances();

  const nativeDisabledAssets = [EAsset.HYPE, EAsset.wHYPE, EAsset.BTC];

  return (
    <Table.ScrollArea
      borderWidth="1px"
      maxW="100vw"
      px={{ base: '5px', md: 0 }}
      border="none"
    >
      <Table.Root>
        <Table.Caption />
        <Table.Header>
          <Table.Row height="48px">
            <Table.ColumnHeader>
              <Text fontSize={{ base: '8px', md: '12px' }}>Asset</Text>
            </Table.ColumnHeader>
            <Table.ColumnHeader>
              <STooltip content="Native Balance is the balance of the asset on the native chain. Connect your wallet to display it.">
                <Text fontSize={{ base: '8px', md: '12px' }}>
                  Native Balance
                </Text>
              </STooltip>
            </Table.ColumnHeader>
            <Table.ColumnHeader>
              <STooltip content="HyperCore Balance is the balance on Hyperliquid Exchange.">
                <Text fontSize={{ base: '8px', md: '12px' }}>
                  HyperCore Balance
                </Text>
              </STooltip>
            </Table.ColumnHeader>
            <Table.ColumnHeader>
              <STooltip content="HyperEVM is Hyperliquid's EVM-compatible chain.">
                <Text fontSize={{ base: '8px', md: '12px' }}>
                  HyperEVM Balance
                </Text>
              </STooltip>
            </Table.ColumnHeader>
            <Table.ColumnHeader>
              <Text fontSize={{ base: '8px', md: '12px' }}>Actions</Text>
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(EAsset).map((asset) => (
            <PortfolioTableRow
              key={asset}
              assetSymbol={asset}
              nativeBalance={
                nativeDisabledAssets.includes(asset)
                  ? '-'
                  : nativeBalances[asset].formatted
              }
              hyperCoreBalance={hyperCoreBalances[asset].formatted}
              hyperEvmBalance={hyperEvmBalances[asset].formatted}
            />
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell />
          </Table.Row>
        </Table.Footer>
      </Table.Root>
    </Table.ScrollArea>
  );
};

const PortfolioTableRow = ({
  assetSymbol,
  nativeBalance,
  hyperCoreBalance,
  hyperEvmBalance,
}: {
  assetSymbol: EAsset;
  nativeBalance: string;
  hyperCoreBalance: string;
  hyperEvmBalance: string;
}) => {
  const asset = ASSETS[assetSymbol];
  const { setSelectedBridgeAsset } = useTransactionContext();

  return (
    <Table.Row h={{ base: '40px', md: '52px' }}>
      <Table.Cell>
        <HStack fontSize={{ base: '10px', md: '12px' }}>
          <AssetIcon asset={assetSymbol} />
          {asset.symbol}
        </HStack>
      </Table.Cell>
      <Table.Cell
        fontWeight="bold"
        color={nativeBalance === '-' ? 'text.secondary' : 'text.primary'}
        fontSize={{ base: '10px', md: '12px' }}
      >
        {nativeBalance}
      </Table.Cell>
      <Table.Cell fontWeight="bold" fontSize={{ base: '10px', md: '12px' }}>
        {hyperCoreBalance}
      </Table.Cell>
      <Table.Cell fontWeight="bold" fontSize={{ base: '10px', md: '12px' }}>
        {hyperEvmBalance}
      </Table.Cell>
      <Table.Cell>
        {asset.bridgeAddress && (
          <SButton
            v="primary"
            size="xs"
            px="12px"
            h="28px"
            scale={{ base: '0.7', md: '1' }}
            onClick={() => setSelectedBridgeAsset(assetSymbol)}
          >
            Bridge
          </SButton>
        )}
      </Table.Cell>
    </Table.Row>
  );
};
