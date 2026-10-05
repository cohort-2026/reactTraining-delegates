import { useEffect, useRef, useState } from "react";

type FetchStatus = "idle" | "loading" | "success" | "error";

type FetchResult<T> = {
  data: T | null;
  status: FetchStatus;
  error: string;
};

/**
 * useFetch
 * Fetch JSON from a URL, with loading, error, and abort support.
 * Pass `null` to skip fetching.
 */
function useFetch<T>(url: string | null): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState("");

  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!url) {
      setStatus("idle");
      setData(null);
      setError("");
      return;
    }

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    setStatus("loading");
    setError("");

    (async () => {
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const json = (await res.json()) as T;
        setData(json);
        setStatus("success");
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Something went wrong");
        setStatus("error");
      }
    })();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, status, error };
}

export default useFetch;