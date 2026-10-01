import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);

    if (!storedValue || storedValue === "undefined") {
      return initialValue;
    }

    return JSON.parse(storedValue);
  });

  const updateValue = (newValue) => {
    setValue((prev) => {
      const valueToStore =
        typeof newValue === "function" ? newValue(prev) : newValue;

      localStorage.setItem(key, JSON.stringify(valueToStore));

      return valueToStore;
    });
  };

  return [value, updateValue];
}

export default useLocalStorage;
