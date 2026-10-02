import { useState, useEffect } from 'react';

function useFetch(url) {
  const [result, setResult] = useState({ url: null, data: null, error: null });

  useEffect(() => {
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then((json) => setResult({ url, data: json, error: null }))
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setResult({ url, data: null, error: err.message });
      });

    return () => controller.abort();
  }, [url]);

  const loading = result.url !== url;

  return {
    data: loading ? null : result.data,
    loading,
    error: loading ? null : result.error,
  };
}

export default useFetch;