"use client";
import { useEffect } from "react";

export default function Error({
  error, retry,
}: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div role="alert" className="card">
      <h2>Something went wrong</h2>
      <button onClick={() => retry()}>Try again</button>
    </div>
  );
}
