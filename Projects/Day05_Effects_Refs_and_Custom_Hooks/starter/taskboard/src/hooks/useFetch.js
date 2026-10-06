import { useState, useEffect } from "react";

export function useFetch(url) {
  const [result, setResult] = useState({
    url: null,
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!url) return;
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setResult({ url, data: json, loading: false, error: null });
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setResult({ url, data: null, loading: false, error: err.message });
      });

    return () => controller.abort();
  }, [url]);

  if (!url) return { data: null, loading: false, error: null };
  if (result.url !== url) return { data: null, loading: true, error: null };
  return result;
}