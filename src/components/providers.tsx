import React from "react";
import { ToastProvider } from "@heroui/toast";
import { HeroUIProvider } from "@heroui/react";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/config/tanstack-query";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider />
        {children}
      </QueryClientProvider>
    </HeroUIProvider>
  );
}
