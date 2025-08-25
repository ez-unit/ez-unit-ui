'use client';

import { TAsset } from '@/constants/Assets';
import { Box, Text, VStack } from '@chakra-ui/react';
import QRCodeStyling from 'qr-code-styling';
import { useEffect, useRef } from 'react';

export const QrGenerator = ({
  asset,
  address,
}: {
  asset: TAsset;
  address: string;
}) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!qrRef.current || !address) return;
    const image = asset.icon.replace("url('", '').replace("')", '');

    // Create QR code instance
    const qrCode = new QRCodeStyling({
      width: 226,
      height: 226,
      type: 'canvas',
      data: address,
      image: image,
      dotsOptions: { type: 'square', color: '#ffffff', roundSize: true },
      backgroundOptions: {
        color: 'transparent',
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: '#ffffff',
      },
      cornersDotOptions: {
        type: 'dot',
        color: '#ffffff',
      },
      imageOptions: {
        saveAsBlob: true,
        hideBackgroundDots: true,
        imageSize: 0.3,
        margin: 5,
      },
    });

    qrCodeRef.current = qrCode;

    // Clear previous content and append new QR code
    qrRef.current.innerHTML = '';
    qrCode.append(qrRef.current);

    // Update QR code data when address changes
    qrCode.update({ data: address });

    return () => {
      if (qrRef.current) {
        qrRef.current.innerHTML = '';
      }
    };
  }, [address, asset.icon]);

  if (!address) {
    return <Text>No address provided</Text>;
  }

  return (
    <VStack
      w="240px"
      h="240px"
      bg="#222222"
      borderRadius="8px"
      border="1px solid"
      borderColor="card.border"
      align="center"
      justify="center"
      boxShadow="0px 0px 10px 0px rgba(0, 0, 0, 0.2)"
    >
      <Box w="226px" h="226px" ref={qrRef} />
    </VStack>
  );
};
