// queries/getTimeline.ts
import { TimelineItem } from "../types";
import timelineData from "../data/timeline.json";

export async function getTimeline(): Promise<TimelineItem[]> {
  // Simulate async behavior to maintain compatibility
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(timelineData as TimelineItem[]);
    }, 100);
  });
}
