import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((d) => { setData(d); setError(null); })
      .catch((e) => {
        if (e.name === "AbortError") return;
       setError(e.message)
      })
      .finally(() => setLoading(false));
      return () => controller.abort();
  }, [url]);

  return { data, error, loading };
}
