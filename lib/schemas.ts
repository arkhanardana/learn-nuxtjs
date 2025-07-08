import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .trim()
    .min(3, { message: "Please input character minimal 3" }),
  content: z
    .string({ required_error: "Content is required" })
    .trim()
    .min(3, { message: "Please input content minimal 3" }),
});

export type PostValues = z.infer<typeof postSchema>;

export const signInSchema = z.object({
  email: z.string({ required_error: "Email is required" }).trim().email(),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Please input password minimal 8 character" }),
});

export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = signInSchema.extend({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, { message: "Please input name minimal 2 character" }),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
