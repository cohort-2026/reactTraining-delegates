import type { ChangeEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EditTaskDialog } from "@/components/EditTaskDialog";
import { useDeleteTask } from "@/hooks/useDeleteTask";
import { useMoveTask } from "@/hooks/useMoveTask";
import type { Status, Task } from "@/types";

const statusStyles: Record<Status, string> = {
  todo: "bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-100",
  doing: "bg-amber-200 text-amber-950 dark:bg-amber-800 dark:text-amber-50",
  done: "bg-emerald-200 text-emerald-950 dark:bg-emerald-800 dark:text-emerald-50",
};

const statusLabels: Record<Status, string> = {
  todo: "To do", doing: "In progress", done: "Done",
};

export function TaskCard({ task }: { task: Task }) {
  const moveTask = useMoveTask();
  const deleteTask = useDeleteTask();
  const failed = moveTask.isError || deleteTask.isError;

  function handleDeleteClick() {
    if (window.confirm(`Delete "${task.title}"?`)) {
      deleteTask.mutate(task.id);
    }
  }

  function handleStatusChange(e: ChangeEvent<HTMLSelectElement>) {
    moveTask.mutate({ id: task.id, status: e.target.value as Status });
  }

  return (
    <Card className={`transition hover:-translate-y-0.5 hover:shadow-md ${task.pending ? "opacity-50" : ""}`}>
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
        {failed && (
          <p role="alert" className="text-sm text-red-700 dark:text-red-400">
            Could not save the change. Is json-server running?
          </p>
        )}
      </CardContent>
      <CardFooter className="flex-wrap gap-2">
        <select aria-label="Status" value={task.status} onChange={handleStatusChange}
          disabled={moveTask.isPending || task.pending}
          className="h-7 rounded-md border border-input bg-background px-2 text-sm dark:bg-input/30">
          <option value="todo">To do</option>
          <option value="doing">In progress</option>
          <option value="done">Done</option>
        </select>
        {!task.pending && <EditTaskDialog task={task} />}
        <Button variant="destructive" size="sm" onClick={handleDeleteClick}
          disabled={deleteTask.isPending || task.pending}>
          {deleteTask.isPending ? "Deleting..." : "Delete"}
        </Button>
      </CardFooter>
    </Card>
  );
}
