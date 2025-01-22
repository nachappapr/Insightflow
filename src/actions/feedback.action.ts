"use server";

import { APP_ROUTES } from "@/constants/endpoint";
import { errorMessages } from "@/constants/messages";
import { FeedbackSchema } from "@/schema/feedback.schema";
import { parseWithZod } from "@conform-to/zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { prisma } from "../../prisma";

export const createFeedback = async (
  prevState: unknown,
  formData: FormData
) => {
  const session = await auth();
  const user = session?.user ?? null;
  const submission = parseWithZod(formData, {
    schema: FeedbackSchema,
  });

  if (user === null) return redirect(APP_ROUTES.LOGIN);

  if (submission.status !== "success") return submission.reply();

  const { category, status, ...rest } = submission.value;
  // make db queries
  try {
    await prisma.feedback.create({
      data: {
        ...rest,
        categoryId: category,
        statusId: status,
        userId: user.id as string,
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      switch (error.code) {
        case "P2002":
          return submission.reply({
            formErrors: [errorMessages.unique_feedback_error],
          });
        case "P2003":
          return submission.reply({
            formErrors: [errorMessages.foreign_key_error],
          });
        default:
          console.error("Prisma error:", error);
          return submission.reply({
            formErrors: [errorMessages.unexpected_error],
          });
      }
    } else {
      // Handle other types of errors
      console.error("Unexpected error:", error);
      return submission.reply({
        formErrors: [errorMessages.unexpected_error],
      });
    }
  }

  revalidatePath(APP_ROUTES.DASHBOARD);
  redirect(APP_ROUTES.DASHBOARD);
};

export const editFeedback = async (
  id: string | undefined,
  prevState: unknown,
  formData: FormData
) => {
  const session = await auth();
  const user = session?.user ?? null;
  const submission = parseWithZod(formData, {
    schema: FeedbackSchema,
  });

  if (user === null) return redirect(APP_ROUTES.LOGIN);

  if (submission.status !== "success") return submission.reply();

  const { category, status, ...rest } = submission.value;

  try {
    const feedback = await prisma.feedback.findUnique({
      where: { id: id },
      select: { user: { select: { id: true } } },
    });

    if (feedback?.user.id !== user.id) {
      return submission.reply({
        formErrors: [errorMessages.unauthorized_feedback_edit],
      });
    }

    await prisma.feedback.update({
      where: { id: id },
      data: {
        ...rest,
        categoryId: category,
        statusId: status,
        userId: user.id as string,
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      switch (error.code) {
        case "P2002":
          return submission.reply({
            formErrors: [errorMessages.unique_feedback_error],
          });
        case "P2003":
          return submission.reply({
            formErrors: [errorMessages.foreign_key_error],
          });
        default:
          console.error("Prisma error:", error);
          return submission.reply({
            formErrors: [errorMessages.unexpected_error],
          });
      }
    } else {
      // Handle other types of errors
      console.error("Unexpected error:", error);
      return submission.reply({
        formErrors: [errorMessages.unexpected_error],
      });
    }
  }

  revalidatePath(`${APP_ROUTES.FEEDBACK}/${id}`);
  redirect(`${APP_ROUTES.FEEDBACK}/${id}`);
};

export const deleteFeedback = async (id: string) => {
  const session = await auth();
  const user = session?.user ?? null;

  if (user === null) return redirect(APP_ROUTES.LOGIN);
  console.log("deleteFeedback -> user", user);

  try {
    const feedback = await prisma.feedback.findUnique({
      where: { id: id },
      select: { user: { select: { id: true } } },
    });

    if (feedback?.user.id !== user.id) {
      throw new Error(errorMessages.unauthorized_feedback_delete);
    }

    await prisma.feedback.delete({
      where: { id: id },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new Error(errorMessages.unexpected_error);
  }
  revalidatePath(APP_ROUTES.DASHBOARD);
  redirect(APP_ROUTES.DASHBOARD);
};
