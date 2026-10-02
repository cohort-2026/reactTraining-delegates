// TODO (Lab 6.1 step 5): make this Hook generic: useLocalStorage<T>(key: string, initialValue: T),
// read the stored value as T and return [value, setValue] as const.
// TODO (Lab 6.3 step 2): the mock useAuth Hook stores its user with this Hook.
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