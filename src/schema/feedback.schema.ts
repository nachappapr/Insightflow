import { z } from "zod";

export const CreateFeedbackSchema = z.object({
  title: z.string({ required_error: "Can't be empty" }),
  category: z.string({ required_error: "Can't be empty" }),
  status: z.string({ required_error: "Can't be empty" }),
  description: z.string({ required_error: "Can't be empty" }),
});
