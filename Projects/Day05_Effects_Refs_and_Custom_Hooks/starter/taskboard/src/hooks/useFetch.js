import { useEffect, useState } from "react";

export function useFetch(url) {
  const [state, setState] = useState({ url: null, data: null, error: null });

  useEffect(() => {
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed (${response.status})`);
        return response.json();
      })
      .then((data) => setState({ url, data, error: null }))
      .catch((error) => {
        if (error.name === "AbortError") return;
        setState({ url, data: null, error: error.message });
      });

    return () => controller.abort();
  }, [url]);

  // Loading is derived: the stored result is for a different URL (or none yet)
  const loading = state.url !== url;
  return {
    data: loading ? null : state.data,
    error: loading ? null : state.error,
    loading,
  };
}