// queries/getBlogs.ts
import { Blog } from "../types";
import blogsData from "../data/blogs.json";

export async function getBlogs(): Promise<Blog[]> {
  // Simulate async behavior to maintain compatibility
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(blogsData as Blog[]);
    }, 100);
  });
}
