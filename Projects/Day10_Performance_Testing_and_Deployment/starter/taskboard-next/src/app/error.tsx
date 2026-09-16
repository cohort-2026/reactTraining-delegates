"use client";

import { Button } from "@/components/ui/button";

// error.tsx must be a Client Component. `retry` re-fetches and
// re-renders the segment; the older `reset` prop only re-renders.
export default function Error({
  error, retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="grid gap-4 rounded-lg border border-destructive/50 p-6">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-sm text-muted-foreground">{error.message}</p>
      <Button onClick={() => retry()} className="w-fit">Try again</Button>
    </div>
  );
}
