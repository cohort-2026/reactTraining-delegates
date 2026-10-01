import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);

    fetch(url, { signal: controller.signal })
     .then(function(res) {
        if (!res.ok) {
          throw new Error("Failed");
        }
        return res.json();
      })
     .then(function(result) {
        setData(result);
        setLoading(false);
      })
     .catch(function(err) {
        if (err.name!== "AbortError") {
          setError(err.message);
          setLoading(false);
        }
      });

    return function() {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}