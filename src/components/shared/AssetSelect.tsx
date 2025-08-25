import { ASSETS, EAsset, TAsset } from '@/constants/Assets';
import {
  Box,
  createListCollection,
  HStack,
  Select,
  Text,
  useSelectContext,
} from '@chakra-ui/react';
import { AssetIcon } from './Icons';

interface AssetSelectProps {
  value: EAsset;
  options: EAsset[];
  setAsset: (asset: EAsset) => void;
}

export default function AssetSelect({
  value,
  options,
  setAsset,
}: AssetSelectProps) {
  if (options.length === 0) {
    return <AssetBubble asset={value} />;
  }

  const assets = createListCollection({
    items: options.map((option) => ASSETS[option]),
    itemToString: (item) => item.symbol,
    itemToValue: (item) => item.symbol,
  });
  return (
    <Select.Root
      collection={assets}
      width={{ base: '110px', md: '140px' }}
      p="0"
      defaultValue={[value]}
      onValueChange={(e) => setAsset(e.value[0] as EAsset)}
      positioning={{ sameWidth: true }}
    >
      <Select.HiddenSelect />
      <Select.Control zIndex="1000">
        <Select.Trigger
          minH={{ base: '34px', md: '40px' }}
          borderRadius="18px"
          _open={{ borderRadius: '18px 18px 0 0' }}
          cursor="pointer"
          border="1px solid {colors.card.border}"
          bg="assetSelect.background"
          color="text.primary"
        >
          <SelectValue />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator mr="7px" />
        </Select.IndicatorGroup>
      </Select.Control>
      <Select.Positioner focusRing="none">
        <Select.Content
          mt="-9px"
          cursor="pointer"
          borderRadius="0 0 18px 18px"
          border="1px solid {colors.card.border}"
          boxShadow="none"
          zIndex="1000"
          bg="assetSelect.background"
          backdropFilter="blur(6px)"
        >
          {assets.items
            .filter((item) => item.symbol !== value)
            .map((item) => (
              <Select.Item
                item={item}
                key={item.symbol}
                justifyContent="flex-start"
                cursor="pointer"
                _hover={{
                  bg: 'assetSelect.hover',
                }}
                zIndex="10000"
              >
                <HStack
                  alignItems="center"
                  ml="7px"
                  h={{ base: '32px', md: '36px' }}
                  w="100%"
                  color="text.primary"
                  fontSize={{ base: '12px', md: '14px' }}
                >
                  <Box
                    bgImage={item.icon}
                    w={{ base: '20px', md: '24px' }}
                    h={{ base: '20px', md: '24px' }}
                    bgSize="cover"
                    bgRepeat="no-repeat"
                  />
                  {item.symbol}
                </HStack>
              </Select.Item>
            ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
}
const SelectValue = () => {
  const select = useSelectContext();
  const items = select.selectedItems as Array<TAsset>;

  if (!items?.[0]) {
    return (
      <Select.ValueText
        placeholder="Select asset"
        as={Box}
        pt="4px"
        h="24px"
        ml="7px"
        fontSize={{ base: '12px', md: '14px' }}
      >
        <Text fontSize={{ base: '12px', md: '14px' }}>Select asset</Text>
      </Select.ValueText>
    );
  }

  const { icon, symbol } = items[0];
  return (
    <Select.ValueText placeholder="Select member" h="24px" ml="7px">
      <HStack alignItems="center" h="24px">
        <Box
          bgImage={icon}
          w={{ base: '20px', md: '24px' }}
          h={{ base: '20px', md: '24px' }}
          bgSize="cover"
          bgRepeat="no-repeat"
        />
        <Text fontSize={{ base: '12px', md: '14px' }}>{symbol}</Text>
      </HStack>
    </Select.ValueText>
  );
};

const AssetBubble = ({ asset }: { asset: EAsset }) => {
  return (
    <HStack
      border="1px solid {colors.card.border}"
      borderRadius="18px"
      p="6px"
      pr="12px"
      zIndex="1"
    >
      <AssetIcon asset={asset} w="22px" h="22px" />
      <Text fontSize="16px" fontWeight="600">
        {asset}
      </Text>
    </HStack>
  );
};
