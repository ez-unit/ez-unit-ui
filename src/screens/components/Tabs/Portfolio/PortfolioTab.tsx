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
import { HStack, Table } from '@chakra-ui/react';

export const PortfolioTab = () => {
  // Fetch all balance types at table level
  const { data: nativeBalances } = useGetNativeBalances();
  const { data: hyperCoreBalances } = useGetHyperCoreBalances();
  const { data: hyperEvmBalances } = useHyperEvmBalances();

  const nativeDisabledAssets = [EAsset.HYPE, EAsset.wHYPE, EAsset.BTC];

  return (
    <Table.Root>
      <Table.Caption />
      <Table.Header>
        <Table.Row height="48px">
          <Table.ColumnHeader>Asset</Table.ColumnHeader>
          <Table.ColumnHeader>
            <STooltip content="Native Balance is the balance of the asset on the native chain. Connect your wallet to display it.">
              Native Balance
            </STooltip>
          </Table.ColumnHeader>
          <Table.ColumnHeader>
            <STooltip content="HyperCore Balance is the balance on Hyperliquid Exchange.">
              HyperCore Balance
            </STooltip>
          </Table.ColumnHeader>
          <Table.ColumnHeader>
            <STooltip content="HyperEVM is Hyperliquid's EVM-compatible chain.">
              HyperEVM Balance
            </STooltip>
          </Table.ColumnHeader>
          <Table.ColumnHeader>Actions</Table.ColumnHeader>
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
    <Table.Row h="52px">
      <Table.Cell>
        <HStack>
          <AssetIcon asset={assetSymbol} />
          {asset.symbol}
        </HStack>
      </Table.Cell>
      <Table.Cell
        fontWeight="bold"
        color={nativeBalance === '-' ? 'text.secondary' : 'text.primary'}
      >
        {nativeBalance}
      </Table.Cell>
      <Table.Cell fontWeight="bold">{hyperCoreBalance}</Table.Cell>
      <Table.Cell fontWeight="bold">{hyperEvmBalance}</Table.Cell>
      <Table.Cell>
        {asset.bridgeAddress && (
          <SButton
            v="primary"
            size="xs"
            px="12px"
            h="28px"
            onClick={() => setSelectedBridgeAsset(assetSymbol)}
          >
            Bridge
          </SButton>
        )}
      </Table.Cell>
    </Table.Row>
  );
};
