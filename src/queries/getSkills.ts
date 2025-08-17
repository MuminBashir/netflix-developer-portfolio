// queries/getSkills.ts
import { Skill } from "../types";
import skillsData from "../data/skills.json";

export async function getSkills(): Promise<Skill[]> {
  // Simulate async behavior to maintain compatibility
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(skillsData as Skill[]);
    }, 100);
  });
}
