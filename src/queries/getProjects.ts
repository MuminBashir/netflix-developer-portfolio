// queries/getProjects.ts
import { Project } from "../types";
import projectsData from "../data/projects.json";

export async function getProjects(): Promise<Project[]> {
  // Simulate async behavior to maintain compatibility
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(projectsData as Project[]);
    }, 100);
  });
}
