import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/useTheme";

export function ThemeButton() {
  const { theme, toggle } = useTheme();
  return (
    <Button variant="outline" size="sm" onClick={toggle}>
      {theme === "light"
        ? <Sun aria-hidden="true" />
        : <Moon aria-hidden="true" />}
      Theme: {theme}
    </Button>
  );
}
