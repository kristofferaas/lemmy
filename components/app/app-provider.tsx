"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { ThemeProvider } from "../ui/theme";
import { Provider as TextBalancerProvider } from "react-wrap-balancer";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <TextBalancerProvider>
        <QueryClientProvider client={client}>
          <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </TextBalancerProvider>
    </ThemeProvider>
  );
}
