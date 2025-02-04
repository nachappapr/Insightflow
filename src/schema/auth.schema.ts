import { z } from "zod";

export const signInWithMagicLinkSchema = z.object({
  email: z
    .string({ required_error: "Can't be empty" })
    .email({ message: "Invalid email address" }),
  callbackurl: z.string().optional(),
});
