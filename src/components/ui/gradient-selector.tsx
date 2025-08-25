'use client';

import { Button, HStack, VStack } from '@chakra-ui/react';
import { useState } from 'react';

export interface Gradient {
  name: string;
  description: string;
  className: string;
  style: React.CSSProperties;
}

interface GradientSelectorProps {
  gradients: Gradient[];
  onGradientChange?: (gradient: Gradient) => void;
  selectedGradient?: Gradient;
}

export function GradientSelector({
  gradients,
  onGradientChange,
  selectedGradient,
}: GradientSelectorProps) {
  const [currentGradient, setCurrentGradient] = useState<Gradient>(
    selectedGradient || gradients[0]
  );
  //   const toast = useToast();

  const handleGradientSelect = (gradient: Gradient) => {
    setCurrentGradient(gradient);
    onGradientChange?.(gradient);

    // toast({
    //   title: `Applied ${gradient.name}`,
    //   description: gradient.description,
    //   status: 'success',
    //   duration: 2000,
    //   isClosable: true,
    // });
  };

  return (
    <VStack gap={4} w="full" maxW="800px">
      {/* Current gradient preview */}
      {/* <Box
        w="full"
        h="200px"
        borderRadius="lg"
        position="relative"
        overflow="hidden"
        className={currentGradient.className}
        style={currentGradient.style}
        border="2px solid"
        borderColor="whiteAlpha.300"
      >
        <Box
          position="absolute"
          bottom={4}
          left={4}
          right={4}
          bg="blackAlpha.700"
          p={3}
          borderRadius="md"
        >
          <Text fontSize="md" fontWeight="bold" color="white">
            {currentGradient.name}
          </Text>
          <Text fontSize="sm" color="whiteAlpha.800"></Text>
        </Box>
      </Box> */}

      {/* Gradient options */}
      <HStack gap={3} flexWrap="wrap" justify="center">
        {gradients.map((gradient, index) => (
          <Button
            key={index}
            size="sm"
            variant="outline"
            colorScheme="green"
            onClick={() => handleGradientSelect(gradient)}
            // isActive={currentGradient.name === gradient.name}
            _active={{
              bg: 'green.500',
              color: 'white',
              borderColor: 'green.500',
            }}
            _hover={{
              bg: 'green.500',
              color: 'white',
              borderColor: 'green.500',
            }}
          >
            {gradient.name}
          </Button>
        ))}
      </HStack>
    </VStack>
  );
}

// Predefined gradients
export const defaultGradients: Gradient[] = [
  {
    name: '1',
    description: 'Flowing matrix-inspired green with animated movement',
    className:
      'bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 animate-gradient-x',
    style: {
      background: 'linear-gradient(-45deg, #064e3b, #166534, #134e4a, #0f766e)',
      backgroundSize: '400% 400%',
      animation: 'gradient 8s ease infinite',
    },
  },
  //   {
  //     name: 'Cyber Pulse',
  //     description: 'Pulsing neon green with electric energy',
  //     className: 'animate-pulse-glow',
  //     style: {
  //       background:
  //         'radial-gradient(ellipse at center, #10b981 0%, #059669 25%, #047857 50%, #065f46 75%, #064e3b 100%)',
  //       animation: 'pulse-glow 3s ease-in-out infinite alternate',
  //     },
  //   },
  {
    name: '2',
    description: 'Deep forest greens with subtle movement',
    className: 'animate-forest-wave',
    style: {
      background:
        'linear-gradient(45deg, #064e3b, #065f46, #064e3b, #065f46, #064e3b)',
      backgroundSize: '300% 300%',
      animation: 'forest-wave 12s ease-in-out infinite',
    },
  },
  {
    name: '3',
    description: 'Swirling emerald with dynamic rotation',
    className: 'animate-emerald-storm',
    style: {
      background:
        'conic-gradient(from 0deg at 50% 50%, #064e3b, #10b981, #047857, #34d399, #065f46, #064e3b)',
      animation: 'emerald-storm 10s linear infinite',
    },
  },
  {
    name: '4',
    description: 'Bright neon green waves with glow effect',
    className: 'animate-neon-waves',
    style: {
      background: 'linear-gradient(270deg, #00ff88, #00cc6a, #00994d, #00ff88)',
      backgroundSize: '400% 400%',
      animation: 'neon-waves 6s ease infinite',
      boxShadow: '0 0 50px rgba(0, 255, 136, 0.3)',
    },
  },
  {
    name: '5',
    description: 'Quantum-inspired green field with particle effects',
    className: 'animate-quantum-field',
    style: {
      background: `
        radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(5, 150, 105, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(4, 120, 87, 0.3) 0%, transparent 50%),
        linear-gradient(135deg, #064e3b, #134e4a, #166534)
      `,
      animation: 'quantum-field 15s ease-in-out infinite',
    },
  },
];
