import { Tooltip as ChakraTooltip, Flex, Portal } from '@chakra-ui/react';
import * as React from 'react';
import { HiOutlineInformationCircle } from 'react-icons/hi2';

export interface TooltipProps extends ChakraTooltip.RootProps {
  showArrow?: boolean;
  showIcon?: boolean;
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
  content: React.ReactNode;
  contentProps?: ChakraTooltip.ContentProps;
  disabled?: boolean;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(props, ref) {
    const {
      showArrow = true,
      showIcon = true,
      children,
      disabled,
      portalled = true,
      content,
      contentProps = {}, // Default contentProps
      portalRef,
      ...rest
    } = props;

    if (disabled) return children;

    // Merge default styles with user-provided contentProps
    const mergedContentProps = {
      ...contentProps,
      css: {
        '--tooltip-bg': 'gray', // Default background color
        ...(contentProps.css || {}), // Merge user-provided CSS
      },
    };

    return (
      <ChakraTooltip.Root {...rest} openDelay={250}>
        <ChakraTooltip.Trigger asChild>
          <Flex align="center" gap="5px" userSelect="none">
            {children}
            {showIcon && <HiOutlineInformationCircle />}
          </Flex>
        </ChakraTooltip.Trigger>
        <Portal disabled={!portalled} container={portalRef}>
          <ChakraTooltip.Positioner>
            <ChakraTooltip.Content
              ref={ref}
              p="8px"
              {...mergedContentProps}
              bgColor="tooltip"
              color="text.primary"
              border="1px solid #333333"
              fontSize={{ base: '12px', md: '14px' }}
              lineHeight="1.5"
            >
              {showArrow && (
                <ChakraTooltip.Arrow>
                  <ChakraTooltip.ArrowTip />
                </ChakraTooltip.Arrow>
              )}
              {content}
            </ChakraTooltip.Content>
          </ChakraTooltip.Positioner>
        </Portal>
      </ChakraTooltip.Root>
    );
  }
);
