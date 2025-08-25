'use client';
import { HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { GithubIcon } from '../shared/Icons';

export default function Footer() {
  return (
    <HStack
      height="52px"
      as="footer"
      justify="space-between"
      px="80px"
      align="center"
    >
      <HStack gap="1rem" align="center">
        {FooterLinks.map((link) => (
          <FooterLink key={link.href} {...link} />
        ))}
      </HStack>

      <HStack gap="1rem" color="text.gray.9" align="center">
        <Link href="https://github.com/ez-unit" target="_blank">
          <GithubIcon width="20px" height="20px" />
        </Link>
      </HStack>
    </HStack>
  );
}

const FooterLinks = [
  { label: 'Terms', href: '/terms' },
  { label: 'Unit Docs', href: 'https://docs.hyperunit.xyz/' },
  {
    label: 'Hyperliquid Docs',
    href: 'https://hyperliquid.gitbook.io/hyperliquid-docs',
  },
];

const FooterLink = ({ label, href }: { label: string; href: string }) => {
  return (
    <Link href={href}>
      <Text color="text.unit">{label}</Text>
    </Link>
  );
};
