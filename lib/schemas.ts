import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .trim()
    .min(3, { message: "Please input character minimal 3" }),
  body: z
    .string({ required_error: "Content is required" })
    .trim()
    .min(3, { message: "Please input content minimal 3" }),
});
