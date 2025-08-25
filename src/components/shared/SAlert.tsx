import { Box, HStack, StackProps } from '@chakra-ui/react';
import { IconCheck, IconError, IconInfo, IconWarning } from './Icons';

export enum EAlertType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

interface IAlertProps extends StackProps {
  type: EAlertType;
  isBordered?: boolean;
  iconSize?: any;
  hideIcon?: boolean;
}

const AlertIcon = ({ type, size }: { type: EAlertType; size: any }) => {
  switch (type) {
    case EAlertType.Success:
      return <IconCheck w={size} h={size} />;
    case EAlertType.Error:
      return <IconError w={size} h={size} />;
    case EAlertType.Warning:
      return <IconWarning w={size} h={size} />;
    case EAlertType.Info:
      return <IconInfo w={size} h={size} />;
  }
};

export const SAlert = ({
  type,
  children,
  isBordered = false,
  iconSize = '18px',
  hideIcon = false,
  ...props
}: IAlertProps) => {
  return (
    <HStack
      bg={`alert.${type}.background`}
      px="12px"
      py="8px"
      borderRadius="4px"
      color={`alert.${type}.color`}
      fontWeight="500"
      fontSize="14px"
      border={
        isBordered ? `1px solid ${`{colors.alert.${type}.border}`}` : 'none'
      }
      {...props}
    >
      {!hideIcon && (
        <Box w={iconSize} h={iconSize}>
          <AlertIcon type={type} size={iconSize} />
        </Box>
      )}

      {children}
    </HStack>
  );
};
