import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { TaskForm } from "./TaskForm";
import { useAddTask } from "@/hooks/useAddTask";

type NewTaskDialogProps = {
  projectId: string;
};

export function NewTaskDialog({ projectId }: NewTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const addTask = useAddTask();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a task</DialogTitle>
        </DialogHeader>
        <TaskForm
          onSubmit={async (values) => {
            await addTask.mutateAsync({ ...values, tags: [], projectId });
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
