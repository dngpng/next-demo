"use client";

import { useTheme } from "next-themes";
import { Toaster as SonnerToaster } from "sonner";
import React from "react";

export default function Toaster() {
  const { theme } = useTheme();
  return (
    <SonnerToaster
      position="top-right"
      theme={(theme as "light" | "dark" | "system") ?? "system"}
    />
  );
}
