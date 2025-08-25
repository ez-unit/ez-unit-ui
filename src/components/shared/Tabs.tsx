import { Tabs, TabsTriggerProps } from '@chakra-ui/react';

export const TabTriggerRound = ({ children, ...props }: TabsTriggerProps) => {
  return (
    <Tabs.Trigger
      bg="tabs.background"
      color="tabs.color"
      fontSize="16px"
      minH="36px"
      h="36px"
      borderRadius="18px"
      _selected={{
        bg: 'tabs.selected.background',
        color: 'tabs.selected.color',
      }}
      {...props}
    >
      {children}
    </Tabs.Trigger>
  );
};

export const TabTriggerUnderline = ({
  children,
  ...props
}: TabsTriggerProps) => {
  return (
    <Tabs.Trigger
      fontSize={{ base: '14px', md: '16px' }}
      // minH={{ base: '40px', md: '56px' }}
      minH="40px"
      {...props}
    >
      {children}
    </Tabs.Trigger>
  );
};
