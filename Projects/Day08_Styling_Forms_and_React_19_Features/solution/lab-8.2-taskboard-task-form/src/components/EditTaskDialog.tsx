import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { TaskForm } from "./TaskForm";
import { useUpdateTask } from "@/hooks/useUpdateTask";
import type { Task } from "@/types";

export function EditTaskDialog({ task }: { task: Task }) {
  const [open, setOpen] = useState(false);
  const updateTask = useUpdateTask();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
        </DialogHeader>
        <TaskForm
          key={task.id}
          defaultValues={task}
          onSubmit={async (v) => {
            await updateTask.mutateAsync({ id: task.id, ...v });
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
