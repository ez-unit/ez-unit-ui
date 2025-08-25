'use client';
import { ExplorerLink } from '@/components/shared/ExplorerLink';
import { IconCheckCircle } from '@/components/shared/Icons';
import { ASSETS, EAsset } from '@/constants/Assets';
import { useGetUserOperations } from '@/hooks/read/unit/useGetUserOperations';
import { Operation, OperationState } from '@/lib/unit-sdk';
import { numbroFormat, scaleBigIntToNumber } from '@/utils/format';
import { Box, HStack, Spinner, Table, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

export const TransactionsTable = () => {
  const { data } = useGetUserOperations();
  return (
    <Box w="full" mt="1rem">
      <Text fontSize="16px" fontWeight="bold" color="text.primary" ml="6px">
        Transactions
      </Text>
      <Table.Root mt="10px">
        <Table.Caption />
        <Table.Header>
          <Table.Row height="30px" bg="card.background">
            <Table.ColumnHeader pl="10px">Status</Table.ColumnHeader>
            <Table.ColumnHeader>Type</Table.ColumnHeader>
            <Table.ColumnHeader>Amount</Table.ColumnHeader>
            <Table.ColumnHeader>Source Tx</Table.ColumnHeader>
            <Table.ColumnHeader>Destination Tx</Table.ColumnHeader>
            <Table.ColumnHeader>Time</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.operations.map((operation: Operation) => (
            <OperationRow key={operation.operationId} operation={operation} />
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

// export enum OperationState2 {
//   SrcTxDiscovered = "sourceTxDiscovered",
//   WaitForSrcTxFinalization = "waitForSrcTxFinalization",
//   BuildingDstTx = "buildingDstTx",
//   SignTx = "signTx",
//   BroadcastTx = "broadcastTx",
//   WaitForDstTxFinalization = "waitForDstTxFinalization",
//   ReadyForWithdrawQueue = "readyForWithdrawQueue",
//   QueuedForWithdraw = "queuedForWithdraw",
//   Done = "done",
//   Failure = "failure",
// }

type LoadingState = 'loading' | 'success' | 'failed';

const OperationAmount = ({
  amount,
  assetSymbol,
}: {
  amount: string;
  assetSymbol: string;
}) => {
  const asset = ASSETS[assetSymbol.toUpperCase() as unknown as EAsset]; // TODO: fix this abomination
  return (
    <HStack>
      <Box
        w="16px"
        h="16px"
        bg={asset.icon}
        bgSize="contain"
        bgRepeat="no-repeat"
      />
      <Text
        fontSize="12px"
        fontFamily="mono"
        color="text.primary"
        fontWeight="bold"
      >
        {numbroFormat(scaleBigIntToNumber(BigInt(amount), asset.decimals))}{' '}
        {assetSymbol.toLocaleUpperCase()}
      </Text>
    </HStack>
  );
};

const OperationStatus = ({ state }: { state: OperationState }) => {
  const status = useMemo(() => {
    switch (state) {
      case OperationState.Done:
        return { label: 'Completed', color: 'text.green.9', state: 'success' };
      case OperationState.Failure:
        return { label: 'Failed', color: 'red.500', state: 'failed' };
      default:
        return { label: 'Pending', color: 'yellow', state: 'loading' };
    }
  }, [state]);
  return (
    <HStack gap="0.25rem" fontSize="12px">
      {status.state === 'loading' && <Spinner size="xs" color="blue.400" />}
      {status.state === 'success' && <IconCheckCircle color="text.green.9" />}
      <Text color={status.color}>{status.label}</Text>
    </HStack>
  );
};

const OperationRow = ({ operation }: { operation: Operation }) => {
  const isDeposit = operation.destinationChain === 'hyperliquid';
  return (
    <Table.Row key={operation.operationId} height="36px">
      <Table.Cell pl="10px">
        <OperationStatus state={operation.state} />
      </Table.Cell>
      <Table.Cell>
        <Text
          fontSize="12px"
          fontFamily="mono"
          color={isDeposit ? 'text.green.9' : 'red.500'}
        >
          {isDeposit ? 'Deposit' : 'Withdraw'}
        </Text>
      </Table.Cell>
      <Table.Cell>
        <OperationAmount
          amount={operation.sourceAmount}
          assetSymbol={operation.asset}
        />
      </Table.Cell>
      <Table.Cell>
        <ExplorerLink
          value={operation.sourceTxHash}
          type="tx"
          chain={operation.sourceChain}
        />
      </Table.Cell>
      <Table.Cell>
        <ExplorerLink
          value={operation.destinationTxHash}
          type="tx"
          chain={operation.destinationChain}
        />
      </Table.Cell>
      <Table.Cell>
        <Text fontSize="12px" fontFamily="mono" color="text.secondary">
          {new Date(operation.opCreatedAt).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })}
        </Text>
      </Table.Cell>
    </Table.Row>
  );
};
