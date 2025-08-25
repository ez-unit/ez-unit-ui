import { Button, ButtonProps } from '@chakra-ui/react';

interface SButtonProps extends ButtonProps {
  children: React.ReactNode;
  v?: 'primary' | 'secondary';
}

export const SButton = ({
  children,
  v = 'primary',
  ...props
}: SButtonProps) => {
  return (
    <Button
      bg={`button.${v}.background`}
      color={`button.${v}.color`}
      _hover={{
        bg: `button.${v}.hover.background !important`,
        border: `button.${v}.hover.border !important`,
      }}
      _active={{
        bg: `button.${v}.background !important`,
        transform: 'scale(0.99)',
      }}
      _disabled={{
        bg: `button.${v}.disabled.background`,
        color: `button.${v}.disabled.color`,
        border: `button.${v}.disabled.border !important`,
        opacity: 0.75,
      }}
      transition="all 0.2s ease-in-out"
      border={`1px solid {colors.button.${v}.border}`}
      {...props}
    >
      {children}
    </Button>
  );
};
