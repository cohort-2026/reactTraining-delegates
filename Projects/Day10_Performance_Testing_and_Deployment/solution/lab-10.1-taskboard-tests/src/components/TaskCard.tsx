import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusSelect } from "@/components/StatusSelect";
import { deleteTask } from "@/app/actions";
import type { Status, Task } from "@/lib/types";

const statusStyles: Record<Status, string> = {
  todo: "bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-100",
  doing: "bg-amber-200 text-amber-950 dark:bg-amber-800 dark:text-amber-50",
  done: "bg-emerald-200 text-emerald-950 dark:bg-emerald-800 dark:text-emerald-50",
};

const statusLabels: Record<Status, string> = {
  todo: "To do", doing: "In progress", done: "Done",
};

// A Server Component: only StatusSelect (a client leaf) is interactive.
// Delete uses a plain form bound to a Server Action, so it works even
// before the page's JavaScript has loaded.
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
        <div className="flex items-center gap-2">
          <StatusSelect id={task.id} status={task.status} />
          <form action={deleteTask.bind(null, task.id)}>
            <Button type="submit" variant="destructive" size="sm">Delete</Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
