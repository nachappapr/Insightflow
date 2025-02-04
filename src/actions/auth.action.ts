"use server";

import { signIn, signOut } from "@/auth";
import { APP_ROUTES } from "@/constants/endpoint";
import { signInWithMagicLinkSchema } from "@/schema/auth.schema";
import { parseWithZod } from "@conform-to/zod";

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

  const { callbackurl } = submission.value;

  await signIn("resend", formData, {
    redirectTo: callbackurl ?? APP_ROUTES.DASHBOARD,
  });
};

export const signInWithProvider = async (
  provider: {
    name: string;
    id: string;
  },
  callbackUrl?: string
) => {
  await signIn(provider.id, {
    redirectTo: callbackUrl ?? APP_ROUTES.DASHBOARD,
  });
};

export const signOutAction = async (callbackUrl: string | null) => {
  await signOut({
    redirectTo: callbackUrl ?? APP_ROUTES.LOGIN,
  });
};
