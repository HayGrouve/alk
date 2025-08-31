"use client";

import React from "react";

interface ConvexErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ConvexErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

export class ConvexErrorBoundary extends React.Component<
  ConvexErrorBoundaryProps,
  ConvexErrorBoundaryState
> {
  constructor(props: ConvexErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ConvexErrorBoundaryState {
    // Check if this is a Convex provider error
    if (
      error.message.includes("Convex client") ||
      error.message.includes("ConvexProvider")
    ) {
      return { hasError: true, error };
    }
    // Re-throw other errors
    throw error;
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("Convex error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
