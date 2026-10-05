import { useEffect, useState } from "react";
import { useEffect, useRef, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);

    if (stored) {
      return JSON.parse(stored);
    }

    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}