"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { ConvexClientProvider } from "./ConvexClientProvider";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ConvexClientProvider>
      <AuthProvider>{children}</AuthProvider>
    </ConvexClientProvider>
  );
}
