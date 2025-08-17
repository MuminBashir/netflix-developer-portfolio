// queries/getReading.ts
import { Book } from "../types";
import readingData from "../data/reading.json";

export async function getReading(): Promise<Book[]> {
  // Simulate async behavior to maintain compatibility
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(readingData as Book[]);
    }, 100);
  });
}
