import { useGetPrimaryName } from '@/hooks/read/hln/useGetPrimaryName';
import { formatAddress } from '@/utils/format';
import { Avatar, AvatarGroup, HStack, Text, VStack } from '@chakra-ui/react';
import { useAccount } from 'wagmi';

export const WelcomeHeader = () => {
  const { address } = useAccount();
  const { data: primaryNameData } = useGetPrimaryName(address);
  return (
    <HStack
      justify="space-between"
      w="full"
      borderBottom="1px solid"
      borderColor="border.primary"
    >
      <HStack py="10px">
        <AvatarGroup size="xl">
          <Avatar.Root>
            <Avatar.Fallback>
              <Text>EZ</Text>
            </Avatar.Fallback>
            <Avatar.Image src="unit_cat.png" />
          </Avatar.Root>
        </AvatarGroup>
        <VStack alignItems="flex-start">
          <Text fontSize="xl" fontWeight="bold">
            Welcome
          </Text>
          {address && !primaryNameData && (
            <Text fontSize="lg">{formatAddress(address)}</Text>
          )}
          {primaryNameData && (
            <Text color="text.green.9" fontSize="lg" fontWeight="bold">
              {primaryNameData}
            </Text>
          )}
        </VStack>
      </HStack>
      {/* <VStack>
        <Text fontSize="sm" color="text.secondary">
          Your Balance
        </Text>
        <Text fontSize="2xl" fontWeight="bold">
          $420.69
        </Text>
      </VStack> */}
    </HStack>
  );
};
