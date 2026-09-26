"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/context/ThemeProvider";

export function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
