import { useCallback, useSyncExternalStore } from "react";

// useSyncExternalStore is the tool React provides for reading state that
// lives outside React, such as localStorage. It solves the same problem
// the Vite version solved with useState + an effect, but without an
// effect that calls setState (which the project's lint rules reject) and
// without a hydration mismatch: getServerSnapshot always returns
// `initialValue`, matching what the server rendered, and the real stored
// value appears on the client's first paint after hydration.
function subscribe(key: string, onChange: () => void) {
  function handleStorage(e: StorageEvent) {
    if (e.key === key) onChange();
  }
  window.addEventListener("storage", handleStorage);
  return () => window.removeEventListener("storage", handleStorage);
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const getSnapshot = useCallback(() => window.localStorage.getItem(key), [key]);
  const getServerSnapshot = useCallback(() => null, []);
  const stored = useSyncExternalStore(
    (onChange) => subscribe(key, onChange),
    getSnapshot,
    getServerSnapshot,
  );

  const value = stored !== null ? (JSON.parse(stored) as T) : initialValue;

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const resolved = typeof next === "function" ? (next as (prev: T) => T)(value) : next;
      window.localStorage.setItem(key, JSON.stringify(resolved));
      // The storage event only fires in *other* tabs, so tell this tab too.
      window.dispatchEvent(new StorageEvent("storage", { key }));
    },
    [key, value],
  );

  return [value, setValue] as const;
}
