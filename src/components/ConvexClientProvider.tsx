"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";

// Lazy initialization of Convex client for client-side use
let convex: ConvexReactClient | null = null;

function getConvexClient(): ConvexReactClient | null {
  if (!convex) {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
      console.warn("NEXT_PUBLIC_CONVEX_URL environment variable is not set");
      return null;
    }
    convex = new ConvexReactClient(convexUrl);
  }
  return convex;
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convexClient = getConvexClient();

  // If Convex is not configured, render children without the provider
  if (!convexClient) {
    return <>{children}</>;
  }

  return <ConvexProvider client={convexClient}>{children}</ConvexProvider>;
}
