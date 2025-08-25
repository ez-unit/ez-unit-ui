import { TabTriggerRound } from '@/components/shared/Tabs';
import { Box, Tabs, VStack } from '@chakra-ui/react';
import { DepositTab } from './DepositTab/DepositTab';
import { PortfolioTab } from './Portfolio/PortfolioTab';
import { WithdrawTab } from './WithdrawTab/WithdrawTab';

export const Tabz = () => {
  return (
    <Tabs.Root
      lazyMount
      unmountOnExit
      defaultValue="deposit"
      variant="enclosed"
      w="full"
      as={VStack}
    >
      <Tabs.List
        border="1px solid"
        borderColor="border.primary"
        gap="12px"
        p="0.5rem"
        borderRadius="36px"
        my="10px"
      >
        {/* Deposit */}
        <TabTriggerRound
          value="deposit"
          fontSize="18px"
          minH="32px"
          h="32px"
          borderRadius="18px"
          px="12px"
        >
          <Box px="12px" textAlign="center" w="100%">
            Deposit
          </Box>
        </TabTriggerRound>

        {/* Withdraw */}
        <TabTriggerRound
          value="withdraw"
          fontSize="18px"
          minH="32px"
          borderRadius="18px"
          h="32px"
          px="12px"
        >
          <Box px="12px" textAlign="center" w="100%">
            Withdraw
          </Box>
        </TabTriggerRound>

        {/* Bridge */}
        <TabTriggerRound
          value="bridge"
          fontSize="18px"
          minH="32px"
          borderRadius="18px"
          h="32px"
          px="12px"
        >
          <Box px="12px" textAlign="center" w="100%">
            Portfolio | Bridge
          </Box>
        </TabTriggerRound>
      </Tabs.List>

      <Tabs.Content value="deposit">
        <DepositTab />
      </Tabs.Content>

      <Tabs.Content value="withdraw">
        <WithdrawTab />
      </Tabs.Content>

      <Tabs.Content value="bridge">
        <PortfolioTab />
      </Tabs.Content>
    </Tabs.Root>
  );
};
