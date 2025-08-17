// queries/getCertifications.ts
import { Certification } from "../types";
import certificationsData from "../data/certifications.json";

export async function getCertifications(): Promise<Certification[]> {
  // Simulate async behavior to maintain compatibility
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(certificationsData as Certification[]);
    }, 100);
  });
}
