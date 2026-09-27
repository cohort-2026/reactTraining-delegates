import { describe, it, expect } from "vitest";
import { tasksReducer } from "./tasksReducer";
import { taskSchema } from "./schemas";
import type { Task } from "./types";

const task: Task = { id: "1", title: "Plan", status: "todo", points: 3 };

describe("tasksReducer", () => {
  it("adds a task without mutating the original array", () => {
    const before: Task[] = [];
    const after = tasksReducer(before, { type: "added", task });
    expect(after).toHaveLength(1);
    expect(before).toHaveLength(0);
  });

  it("moves a task without mutating state", () => {
    const before = [task];
    const after = tasksReducer(before, {
      type: "moved",
      id: "1",
      status: "done",
    });
    expect(after[0].status).toBe("done");
    expect(before[0].status).toBe("todo");
  });

  it("renames a task without mutating state", () => {
    const before = [task];
    const after = tasksReducer(before, {
      type: "renamed",
      id: "1",
      title: "Plan the sprint",
    });
    expect(after[0].title).toBe("Plan the sprint");
    expect(before[0].title).toBe("Plan");
  });

  it("deletes a task without mutating state", () => {
    const before = [task];
    const after = tasksReducer(before, { type: "deleted", id: "1" });
    expect(after).toHaveLength(0);
    expect(before).toHaveLength(1);
  });

  it("leaves tasks unchanged when the id does not match", () => {
    const before = [task];
    const after = tasksReducer(before, {
      type: "moved",
      id: "nope",
      status: "done",
    });
    expect(after[0].status).toBe("todo");
  });
});

describe("taskSchema", () => {
  it("accepts a valid task", () => {
    const result = taskSchema.safeParse({
      title: "Plan",
      status: "todo",
      points: 3,
    });
    expect(result.success).toBe(true);
  });

  it("rejects short titles", () => {
    const result = taskSchema.safeParse({
      title: "ab",
      status: "todo",
      points: 3,
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid status", () => {
    const result = taskSchema.safeParse({
      title: "Plan",
      status: "finished",
      points: 3,
    });
    expect(result.success).toBe(false);
  });

  it("coerces a numeric string for points", () => {
    const result = taskSchema.safeParse({
      title: "Plan",
      status: "todo",
      points: "3",
    });
    expect(result.success).toBe(true);
    expect(result.success && result.data.points).toBe(3);
  });
});
