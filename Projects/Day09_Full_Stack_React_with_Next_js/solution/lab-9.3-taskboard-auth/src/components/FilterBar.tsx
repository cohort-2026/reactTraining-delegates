"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// The search term lives in the URL (?q=...), not in client state, so a
// filtered view can be bookmarked or shared.
export function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  function setQuery(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) params.set("q", value);
    else params.delete("q");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="grid gap-2">
      <Label htmlFor="search">Search tasks</Label>
      <Input id="search" type="search" defaultValue={q} className="w-64"
        onChange={(e) => setQuery(e.target.value)} />
    </div>
  );
}
