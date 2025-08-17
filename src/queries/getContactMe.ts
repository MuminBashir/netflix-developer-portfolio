// queries/getContactMe.ts
import { ContactMe } from "../types";
import contactMeData from "../data/contactMe.json";

export async function getContactMe(): Promise<ContactMe> {
  // Simulate async behavior to maintain compatibility
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(contactMeData as ContactMe);
    }, 100);
  });
}
