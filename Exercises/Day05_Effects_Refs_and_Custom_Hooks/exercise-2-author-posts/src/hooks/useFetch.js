import { useEffect, useState } from "react";

export function useFetch(url) {
  const [result, setResult] = useState({ url: null, data: null, error: null });

  useEffect(() => {
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setResult({ url, data, error: null }))
      .catch((e) => {
        if (e.name !== "AbortError") {
          setResult({ url, data: null, error: e.message });
        }
      });

    return () => controller.abort();
  }, [url]);

  const loading = result.url !== url;
  return {
    data: loading ? null : result.data,
    error: loading ? null : result.error,
    loading,
  };
}
