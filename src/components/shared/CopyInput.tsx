import {
  Clipboard,
  ClipboardRootProps,
  IconButton,
  Input,
  InputGroup,
} from '@chakra-ui/react';

export const CopyInput = ({
  value,
  ...props
}: { value: string } & ClipboardRootProps) => {
  return (
    <Clipboard.Root {...props}>
      <InputGroup mt="4px" endElement={<ClipboardIconButton />}>
        <Clipboard.Input
          asChild
          bg="input.background"
          border="1px solid"
          borderColor="input.border"
        >
          <Input
            fontSize={value.length > 60 ? '11.2px' : '14px'}
            fontFamily="mono"
            pl="0.5rem"
            color="text.primary"
            defaultValue={value}
          />
        </Clipboard.Input>
      </InputGroup>
    </Clipboard.Root>
  );
};

const ClipboardIconButton = () => {
  return (
    <Clipboard.Trigger asChild scale="0.8" bg="whiteAlpha.300">
      <IconButton variant="surface" size="xs" me="4px">
        <Clipboard.Indicator />
      </IconButton>
    </Clipboard.Trigger>
  );
};
