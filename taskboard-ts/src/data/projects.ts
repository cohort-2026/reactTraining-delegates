import type { Project } from "../types";

export const PROJECTS: Project[] = [
  { id: "website", name: "Website redesign" },
  { id: "mobile", name: "Mobile app" },
];

export const DEFAULT_PROJECT_ID = PROJECTS[0].id;