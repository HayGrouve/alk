"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";

// Lazy initialization of Convex client for client-side use
let convex: ConvexReactClient | null = null;

function getConvexClient(): ConvexReactClient {
  if (!convex) {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
      throw new Error("NEXT_PUBLIC_CONVEX_URL environment variable is not set");
    }
    convex = new ConvexReactClient(convexUrl);
  }
  return convex;
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convexClient = getConvexClient();
  return <ConvexProvider client={convexClient}>{children}</ConvexProvider>;
}
