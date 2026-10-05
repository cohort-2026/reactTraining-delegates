import { useEffect, useState } from "react";

/**
 * useLocalStorage
 * Like useState, but the value is persisted to localStorage.
 *
 * Usage:
 *   const [name, setName] = useLocalStorage("name", "world");
 *
 * Reads the initial value from localStorage (falling back to initialValue
 * if nothing is stored yet). Writes to localStorage whenever the value changes.
 *
 * @param {string} key            localStorage key
 * @param {any}    initialValue   value used when nothing is stored
 */
function useLocalStorage(key, initialValue) {
  // Lazy initializer: only runs once, on the first render.
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.warn(`useLocalStorage: failed to read "${key}"`, err);
      return initialValue;
    }
  });

  // Write to localStorage whenever key or value changes.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`useLocalStorage: failed to write "${key}"`, err);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;