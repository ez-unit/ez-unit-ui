import { Text, VStack } from '@chakra-ui/react';

export default function TermsPage() {
  return (
    <VStack w="100%" h="100%" justify="center" align="center" gap="1rem">
      <Text>
        EZ Unit is a project built for the Hyperliquid community hackathon. It
        is not affiliated with Hyperliquid, Unit or its developers.
      </Text>
      <Text>It was shipped in 10 days and still in experimental state.</Text>
      <Text>Use at your own risk.</Text>
    </VStack>
  );
}
