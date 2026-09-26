"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Both filters live in the URL (?q=...&assignee=...) rather than in
// client state, so a filtered board can be bookmarked or shared.
export function FilterBar({ assignees }: { assignees: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const assignee = searchParams.get("assignee") ?? "";

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-end gap-4">
      <div className="grid gap-2">
        <Label htmlFor="search">Search tasks</Label>
        <Input id="search" type="search" defaultValue={q} className="w-64"
          onChange={(e) => setParam("q", e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="assignee-filter">Assignee</Label>
        <select id="assignee-filter" value={assignee}
          onChange={(e) => setParam("assignee", e.target.value)}
          className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm dark:bg-input/30">
          <option value="">Everyone</option>
          {assignees.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
