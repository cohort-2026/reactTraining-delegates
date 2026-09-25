export type Project = {
  id: string;
  name: string;
  description: string;
};

export const projects: Project[] = [
  { id: "1", name: "Website", description: "The new company website." },
  { id: "2", name: "Mobile app", description: "The TaskBoard mobile app." },
];
