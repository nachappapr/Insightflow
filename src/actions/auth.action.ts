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

  await signIn("resend", formData, {
    redirectTo: APP_ROUTES.DASHBOARD,
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
    redirectTo: APP_ROUTES.DASHBOARD,
  });
};

export const signOutAction = async () => {
  await signOut({
    redirectTo: APP_ROUTES.LOGIN,
  });
};
