import { useEffect, useState } from "react";

/**
 * useLocalStorage
 * Like useState, but the value is persisted to localStorage.
 *
 * Generic over T — the type of the stored value.
 */
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? (JSON.parse(stored) as T) : initialValue;
    } catch (err) {
      console.warn(`useLocalStorage: failed to read "${key}"`, err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`useLocalStorage: failed to write "${key}"`, err);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;