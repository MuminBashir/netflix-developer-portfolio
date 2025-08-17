// queries/getProfileBanner.ts
import { ProfileBanner } from "../types";
import profileBannerData from "../data/profileBanner.json";

export async function getProfileBanner(): Promise<ProfileBanner> {
  // Simulate async behavior to maintain compatibility
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(profileBannerData as ProfileBanner);
    }, 100);
  });
}
