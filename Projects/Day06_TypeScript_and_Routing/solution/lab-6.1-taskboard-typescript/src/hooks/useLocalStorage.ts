import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

function readValue<T>(key: string, initialValue: T): T {
  const stored = localStorage.getItem(key);
  return stored === null ? initialValue : (JSON.parse(stored) as T);
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => readValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
