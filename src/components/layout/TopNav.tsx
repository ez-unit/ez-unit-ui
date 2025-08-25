'use client';

import { Box, HStack, Text } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation';
import ColorToggle from './ColorToggle';

export default function TopNav() {
  const router = useRouter();

  return (
    <Box as="nav">
      <HStack
        height={{ base: '56px', md: '64px', xl: '64px' }} // 88px
        px={{ base: '10px', sm: '10px', md: '10px', xl: '80px' }}
        userSelect="none"
        justify="space-between"
        bg="topNav.bg"
        position="relative"
        w="full"
        zIndex={1000}
      >
        <HStack gap="1rem">
          <HStack
            onClick={() => router.push('/')}
            cursor="pointer"
            userSelect="none"
          >
            <Box
              bgImage="url('/ez_unit_logo.png')"
              w="40px"
              h="40px"
              bgSize="contain"
              bgRepeat="no-repeat"
            />
            <Text fontSize="24px" fontWeight="bold" color="text.unit">
              EZ UNIT
            </Text>
          </HStack>
          <HStack
            ml="1.5rem"
            gap="1rem"
            display={{ base: 'none', lg: 'flex' }}
          ></HStack>
        </HStack>
        <HStack gap="1rem" scale={{ base: '0.8', md: '1' }}>
          <ConnectButton />
          <ColorToggle />
          {/* <WalletMenu /> */}
        </HStack>
      </HStack>
    </Box>
  );
}

// const NavLink = ({
//   label,
//   href,
//   width,
// }: {
//   label: string;
//   href: string;
//   width?: string;
// }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const isActive = pathname === href;
//   return (
//     <Box
//       onClick={() => router.push(href)}
//       cursor="pointer"
//       fontWeight="500"
//       color={isActive ? 'topNav.linkLabelActive' : 'topNav.linkLabel'}
//       _hover={{
//         color: isActive ? 'topNav.linkLabelActive' : 'topNav.linkLabelHover',
//       }}
//       transition="color 50ms ease-in-out"
//       w={width}
//     >
//       <Text>{label}</Text>
//     </Box>
//   );
// };

// const WalletMenu = () => {
//   const { data: assetBalances } = useAssetBalances();
//   const walletAssets = [
//     ASSETS[EAsset.USDT0],
//     ASSETS[EAsset.USDX],
//     ASSETS[EAsset.CONSOL],
//     // ASSETS[EAsset.uBTC],
//   ];
//   return (
//     <Menu.Root>
//       <Menu.Trigger focusRing="none" asChild>
//         <Button variant="outline" size="sm" borderRadius="full">
//           <IoWallet />
//         </Button>
//       </Menu.Trigger>
//       <Menu.Positioner>
//         <Menu.Content bg="tabs.background">
//           <Menu.ItemGroup>
//             {walletAssets.map((asset) => (
//               <Menu.Item key={asset.symbol} value={asset.symbol} p="0.5rem">
//                 <HStack justifyContent="space-between" w="100%">
//                   <HStack gap="0.5rem" w="100px">
//                     <AssetIcon asset={asset.symbol as EAsset} />
//                     <Text>{asset.symbol}</Text>
//                   </HStack>
//                   <Text>
//                     {assetBalances?.[asset.symbol as EAsset].formatted}
//                   </Text>
//                 </HStack>
//               </Menu.Item>
//             ))}
//           </Menu.ItemGroup>

//           <Menu.Separator />
//           <Menu.Arrow />
//         </Menu.Content>
//       </Menu.Positioner>
//     </Menu.Root>
//   );
// };
