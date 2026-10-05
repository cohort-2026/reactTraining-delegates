import { useEffect, useRef, useState } from "react";

/**
 * useFetch
 * Fetch data from a URL with loading, error, and abort support.
 *
 * Usage:
 *   const { data, status, error } = useFetch("https://api.example.com/thing");
 *
 * Pass `null` as the URL to skip fetching (useful when the URL isn't ready yet).
 *
 * Returns:
 *   data   — parsed JSON, or null before any successful fetch
 *   status — "idle" | "loading" | "success" | "error"
 *   error  — error message, or "" if no error
 */
function useFetch(url) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const controllerRef = useRef(null);

  useEffect(() => {
    // Skip fetching when url is null/empty (e.g. the user hasn't picked a city yet)
    if (!url) {
      setStatus("idle");
      setData(null);
      setError("");
      return;
    }

    // Abort the previous request (if any) before starting a new one
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

        const json = await res.json();
        setData(json);
        setStatus("success");
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message || "Something went wrong");
        setStatus("error");
      }
    })();

    return () => {
      // Cancel the in-flight request when url changes or the component unmounts
      controller.abort();
    };
  }, [url]);

  return { data, status, error };
}

export default useFetch;