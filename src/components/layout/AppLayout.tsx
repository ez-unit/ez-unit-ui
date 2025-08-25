import { Box, VStack } from '@chakra-ui/react';

import { BridgeAssetModal } from '../Modals/BridgeAssetModal';
import { Toaster } from '../ui/toaster';
import Footer from './Footer';
import TopNav from './TopNav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box
        minH="100svh"
        display="flex"
        flexDirection="column"
        bgColor="background"
        color="text.primary"
      >
        <TopNav />
        <VStack flex="1" overflow="auto" align="center" justify="center">
          {children}
        </VStack>
        <Footer />
      </Box>
      <BridgeAssetModal />
      <Toaster />
    </>
  );
}
