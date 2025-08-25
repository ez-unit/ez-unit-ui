'use client';
import { VStack } from '@chakra-ui/react';
import { Tabz } from './components/Tabs/Tabz';
import { TransactionsTable } from './components/Transactions/TransactionsTable';
import { WelcomeHeader } from './components/WelcomeHeader';

export default function HomeScreen() {
  return (
    <VStack
      justify="flex-start"
      align="flex-start"
      minH="calc(100svh - 120px)"
      w="full"
      maxW="5xl"
    >
      <WelcomeHeader />
      <Tabz />
      <TransactionsTable />
    </VStack>
  );
}
