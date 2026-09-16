import type { Project, Task } from "@/lib/types";

const projects: Project[] = [
  { id: "website", name: "Website redesign" },
  { id: "mobile", name: "Mobile app" },
  { id: "archive", name: "Old archive" },
];

const tasks: Task[] = [
  { id: "1", title: "Plan the sprint", status: "todo", points: 3, projectId: "website" },
  { id: "2", title: "Build the board", status: "doing", points: 5, projectId: "website" },
  { id: "3", title: "Write the README", status: "done", points: 1, projectId: "mobile" },
];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getProjects(): Promise<Project[]> {
  await delay(200);
  return projects;
}

export async function getProject(id: string): Promise<Project | undefined> {
  await delay(500);
  if (id === "archive") {
    throw new Error("The archive service is offline");
  }
  return projects.find((project) => project.id === id);
}

export async function getTasks(projectId: string): Promise<Task[]> {
  await delay(300);
  return tasks.filter((task) => task.projectId === projectId);
}
