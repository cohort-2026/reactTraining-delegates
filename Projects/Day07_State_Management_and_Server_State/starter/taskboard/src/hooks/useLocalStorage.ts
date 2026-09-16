// TODO (Lab 7.1 steps 4-5): ThemeProvider and AuthProvider persist their values with this Hook.
// TODO (Lab 7.2 step 4): the Zustand persist middleware replaces it for tasks.
import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored !== null ? (JSON.parse(stored) as T) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
