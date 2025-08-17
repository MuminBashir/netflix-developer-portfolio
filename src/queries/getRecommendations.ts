// queries/getRecommendations.ts
import { Recommendation } from "../types";
import recommendationsData from "../data/recommendations.json";

export async function getRecommendations(): Promise<Recommendation[]> {
  // Simulate async behavior to maintain compatibility
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(recommendationsData as Recommendation[]);
    }, 100);
  });
}
