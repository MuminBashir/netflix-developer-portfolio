// queries/getMusic.ts
import { MusicData } from "../types";
import musicData from "../data/music.json";

export async function getMusic(): Promise<MusicData> {
  // Simulate async behavior to maintain compatibility
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(musicData as MusicData);
    }, 100);
  });
}
