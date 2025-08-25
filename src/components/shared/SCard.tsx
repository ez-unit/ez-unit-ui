import { Box, BoxProps, Stack, StackProps } from '@chakra-ui/react';

interface SCardProps extends BoxProps {
  children: React.ReactNode;
  isShadow?: boolean;
  isContainer?: boolean;
  isTabs?: boolean;
}
interface StackCardProps extends StackProps {
  children: React.ReactNode;
  isShadow?: boolean;
  isContainer?: boolean;
  isTabs?: boolean;
}

export function SCard({
  children,
  isShadow,
  isContainer,
  isTabs,
  ...props
}: SCardProps) {
  return (
    <Box
      bg="card.background"
      borderRadius="12px"
      border="1px solid {colors.card.border}"
      p="1rem"
      boxShadow={
        isShadow ? '0px 8px 16px -4px {colors.card.boxShadow}' : 'none'
      }
      mx={isContainer ? '5px' : '0'}
      w={isContainer ? '100%' : 'auto'}
      pt={isTabs ? '0.5rem' : '1rem'}
      {...props}
    >
      {children}
    </Box>
  );
}

export function StackCard({
  children,
  isShadow,
  isContainer,
  isTabs,
  ...props
}: StackCardProps) {
  return (
    <Stack
      bg="card.background"
      borderRadius="12px"
      border="1px solid {colors.card.border}"
      p="1rem"
      boxShadow={
        isShadow ? '0px 8px 16px -4px {colors.card.boxShadow}' : 'none'
      }
      mx={isContainer ? '5px' : '0'}
      w={isContainer ? '100%' : 'auto'}
      {...props}
    >
      {children}
    </Stack>
  );
}
