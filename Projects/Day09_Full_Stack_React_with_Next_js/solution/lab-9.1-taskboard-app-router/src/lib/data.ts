import type { Project, Task } from "@/lib/types";

export const projects: Project[] = [
  { id: "website", name: "Website" },
  { id: "mobile", name: "Mobile app" },
];

const tasks: Task[] = [
  { id: "1", title: "Plan the sprint", status: "todo", points: 3, tags: [], projectId: "website" },
  { id: "2", title: "Build the board", status: "doing", points: 5, tags: [], projectId: "website", assignee: "Zanele" },
  { id: "3", title: "Write the README", status: "done", points: 1, tags: [], projectId: "website" },
  { id: "4", title: "Design the onboarding flow", status: "todo", points: 5, tags: [], projectId: "mobile" },
  { id: "5", title: "Wire up push notifications", status: "doing", points: 8, tags: [], projectId: "mobile", assignee: "Sipho" },
];

// A short delay stands in for a real network call, so loading.tsx has
// something to show. Lab 9.2 replaces this file with a Supabase query.
export async function getTasks(): Promise<Task[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return tasks;
}

export async function getProject(projectId: string): Promise<Project | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return projects.find((p) => p.id === projectId);
}
