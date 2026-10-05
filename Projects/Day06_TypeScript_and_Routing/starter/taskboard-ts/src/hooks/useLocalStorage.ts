import { useState, type SetStateAction } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);

    if (!storedValue || storedValue === "undefined") {
      return initialValue;
    }

    return JSON.parse(storedValue) as T;
  });

  const updateValue = (newValue: SetStateAction<T>) => {
    setValue((prev) => {
      const valueToStore =
        typeof newValue === "function"
          ? (newValue as (prev: T) => T)(prev)
          : newValue;

      localStorage.setItem(key, JSON.stringify(valueToStore));
      return valueToStore;
    });
  };

  return [value, updateValue] as const;
}

export default useLocalStorage;
