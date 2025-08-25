import { Chain } from '@/lib/unit-sdk';
import { HStack } from '@chakra-ui/react';
import Link from 'next/link';
import { IconExternalLink } from './Icons';

interface IExplorerLinkProps {
  value: string;
  type: 'tx' | 'address';
  chain: Chain;
}
export const ExplorerLink = ({ value, type, chain }: IExplorerLinkProps) => {
  return (
    <Link href={getExplorerUrl(value, type, chain)} target="_blank">
      <HStack gap="0.25rem" fontSize="12px" fontFamily="mono" color="text.link">
        {formatValue(value.split(':')[0], type, chain)}
        <IconExternalLink w="12px" h="12px" />
      </HStack>
    </Link>
  );
};

const getExplorerUrl = (
  value: string,
  type: 'tx' | 'address',
  chain: Chain
) => {
  switch (type) {
    case 'tx':
      return getTxUrl(value, chain);
    case 'address':
      return getAddressUrl(value, chain);
  }
};

const getTxUrl = (value: string, chain: Chain) => {
  switch (chain) {
    case 'bitcoin':
      return `https://mempool.space/tx/${value}`;
    case 'ethereum':
      return `https://etherscan.io/tx/${value}`;
    case 'solana':
      return `https://solscan.io/tx/${value}`;
    case 'hyperliquid':
      return `https://explorer.hyperliquid.xyz/tx/${value}`;
    default:
      return '';
  }
};

const getAddressUrl = (value: string, chain: Chain) => {
  switch (chain) {
    case 'bitcoin':
      return `https://mempool.space/address/${value}`;
    case 'ethereum':
      return `https://etherscan.io/address/${value}`;
    case 'solana':
      return `https://solscan.io/address/${value}`;
    case 'hyperliquid':
      return `https://explorer.hyperliquid.xyz/address/${value}`;
    default:
      return '';
  }
};

const formatValue = (value: string, type: 'tx' | 'address', chain: Chain) => {
  switch (type) {
    case 'tx':
      return `${value.slice(0, 6)}...${value.slice(-4)}`;
    case 'address':
      return `${value.slice(0, 6)}...${value.slice(-4)}`;
  }
};
