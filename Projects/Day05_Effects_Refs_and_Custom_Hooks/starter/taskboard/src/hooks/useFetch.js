import { useEffect, useState } from "react";

function useFetch(url) {
  const [state, setState] = useState({
    data: null,
    resolvedUrl: "",
    error: "",
  });

  useEffect(() => {
    const controller = new AbortController();

    fetch(url, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Request failed");
        }

        return res.json();
      })
      .then((json) => {
        setState({
          data: json,
          resolvedUrl: url,
          error: "",
        });
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setState({
            data: null,
            resolvedUrl: url,
            error: err.message,
          });
        }
      });

    return () => {
      controller.abort();
    };
  }, [url]);

  const loading = state.resolvedUrl !== url;

  return {
    data: state.data,
    loading,
    error: state.error,
  };
}

export default useFetch;
