import { HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { InfoTip } from '../ui/toggle-tip';
import { Tooltip, TooltipProps } from '../ui/tooltip';

interface STooltipProps extends TooltipProps {
  content: string;
  children?: React.ReactNode;
}

export const STooltip: FC<STooltipProps> = ({
  content,
  children,
  ...props
}) => {
  const isMobile =
    typeof window !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);
  return isMobile ? (
    <HStack gap="0">
      {children}
      <InfoTip content={content} {...props} portalled={true}></InfoTip>
    </HStack>
  ) : (
    <Tooltip content={content} showIcon={true} showArrow={false} {...props}>
      {children}
    </Tooltip>
  );
};
