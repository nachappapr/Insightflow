import { z } from "zod";

export const FeedbackSchema = z.object({
  title: z.string({ required_error: "Can't be empty" }),
  category: z.string({ required_error: "Can't be empty" }),
  status: z.string({ required_error: "Can't be empty" }),
  description: z.string({ required_error: "Can't be empty" }),
});

export const CreateCommentSchema = z.object({
  content: z.string({ required_error: "Can't be empty" }).max(1000),
});

export const DeleteCommentSchema = z.object({
  feedbackId: z.string({ required_error: "Invalid feedback id" }),
  commentId: z.string({ required_error: "Invalid comment id" }),
});

export const VotesUpdateSchema = z.object({
  feedbackId: z.string({ required_error: "Invalid feedback id" }),
});
