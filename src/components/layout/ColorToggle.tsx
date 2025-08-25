"use client";

import { ClientOnly, IconButton, Skeleton } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";

export default function ColorToggle() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton
        onClick={toggleColorMode}
        variant="outline"
        size="sm"
        borderRadius="50%"
      >
        {colorMode === "light" ? <LuSun /> : <LuMoon />}
      </IconButton>
    </ClientOnly>
  );
}
