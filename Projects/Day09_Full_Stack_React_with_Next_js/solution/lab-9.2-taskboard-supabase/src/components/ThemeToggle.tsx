"use client";

import { useTheme } from "@/context/useTheme";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <Button variant="outline" size="sm" onClick={toggle}>
      {theme === "light" ? "Dark mode" : "Light mode"}
    </Button>
  );
}
