import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [state, setState] = useState<{
    data: T | null;
    resolvedUrl: string;
    error: string;
  }>({
    data: null,
    resolvedUrl: "",
    error: "",
  });

  useEffect(() => {
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((json: T) => {
        setState({
          data: json,
          resolvedUrl: url,
          error: "",
        });
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name !== "AbortError") {
          setState({
            data: null,
            resolvedUrl: url,
            error: err.message,
          });
        }
      });

    return () => controller.abort();
  }, [url]);

  const loading = state.resolvedUrl !== url;

  return {
    data: state.data,
    loading,
    error: state.error,
  };
}
