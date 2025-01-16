"use server";

import { signInWithMagicLinkSchema } from "@/schema/auth.schema";
import { parseWithZod } from "@conform-to/zod";
import { signIn } from "../../auth";

export const signInWithMagicLink = async (
  prevState: unknown,
  formData: FormData
) => {
  const submission = parseWithZod(formData, {
    schema: signInWithMagicLinkSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await signIn("resend", formData, {
    redirect: "/",
  });
};

export const signInWithProvider = async (
  provider: {
    name: string;
    id: string;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _formData: FormData
) => {
  await signIn(provider.id, {
    redirectTo: "/",
  });
};
