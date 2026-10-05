import { useEffect, useState } from 'react'

export type FetchState<T> = {
  data: T | null
  error: string | null
  loading: boolean
}

export function useFetch<T>(url: string): FetchState<T> {
  const [result, setResult] = useState<{ url: string; state: FetchState<T> }>({
    url,
    state: { data: null, error: null, loading: true },
  })

  useEffect(() => {
    const controller = new AbortController()

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json() as Promise<T>
      })
      .then((result) => {
        setResult({ url, state: { data: result, error: null, loading: false } })
      })
      .catch((reason: unknown) => {
        if (reason instanceof Error && reason.name !== 'AbortError') {
          setResult({ url, state: { data: null, error: reason.message, loading: false } })
        }
      })

    return () => controller.abort()
  }, [url])

  return result.url === url ? result.state : { data: null, error: null, loading: true }
}