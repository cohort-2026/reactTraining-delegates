import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Status, Task } from "@/lib/types";

const statusStyles: Record<Status, string> = {
  todo: "bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-100",
  doing: "bg-amber-200 text-amber-950 dark:bg-amber-800 dark:text-amber-50",
  done: "bg-emerald-200 text-emerald-950 dark:bg-emerald-800 dark:text-emerald-50",
};

const statusLabels: Record<Status, string> = {
  todo: "To do", doing: "In progress", done: "Done",
};

// A plain Server Component: it only displays data, so it needs no
// "use client" directive and ships no JavaScript to the browser.
// Lab 9.3 adds interactive status changes with a Server Action.
export function TaskCard({ task }: { task: Task }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h3>{task.title}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="flex items-center justify-between gap-2">
          <Badge className={statusStyles[task.status]}>
            {statusLabels[task.status]}
          </Badge>
          <span className="text-sm">{task.points} pts</span>
        </div>
        {task.assignee && (
          <p className="text-sm text-muted-foreground">Assigned to {task.assignee}</p>
        )}
      </CardContent>
    </Card>
  );
}
