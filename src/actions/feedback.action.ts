"use server";

import { APP_ROUTES } from "@/constants/endpoint";
import { errorMessages } from "@/constants/messages";
import {
  CreateCommentSchema,
  DeleteCommentSchema,
  FeedbackSchema,
} from "@/schema/feedback.schema";
import { Submission } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { prisma } from "../../prisma";

export async function handlePrismaError<TSchema>(
  error: unknown,
  submission: Submission<TSchema>
) {
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

export const createFeedback = async (
  prevState: unknown,
  formData: FormData
) => {
  const session = await auth();
  const user = session?.user ?? null;
  const submission = parseWithZod(formData, {
    schema: FeedbackSchema,
  });

  // redirect to login if user is not authenticated
  if (user === null) return redirect(APP_ROUTES.LOGIN);

  // reply with form errors if submission is not successful
  if (submission.status !== "success") return submission.reply();

  // create feedback
  const { category, status, ...rest } = submission.value;
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
    handlePrismaError(error, submission);
  }

  // revalidate dashboard page and redirect to dashboard
  revalidatePath(APP_ROUTES.DASHBOARD);
  redirect(APP_ROUTES.DASHBOARD);
};

export const editFeedback = async (
  id: string,
  prevState: unknown,
  formData: FormData
) => {
  const session = await auth();
  const user = session?.user ?? null;

  const submission = parseWithZod(formData, {
    schema: FeedbackSchema,
  });

  // redirect to login if user is not authenticated
  if (user === null) return redirect(APP_ROUTES.LOGIN);

  // reply with form errors if submission is not successful
  if (submission.status !== "success") return submission.reply();

  const { category, status, ...rest } = submission.value;
  try {
    // check if feedback exists
    const feedback = await prisma.feedback.findUnique({
      where: { id: id },
      select: { user: { select: { id: true } } },
    });

    if (!feedback) {
      return submission.reply({
        formErrors: [errorMessages.resource_not_found],
      });
    }

    // reply with unauthorized error if user is not the owner of the feedback
    if (feedback.user.id !== user.id) {
      return submission.reply({
        formErrors: [errorMessages.unauthorized_feedback_edit],
      });
    }

    // update feedback
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
    handlePrismaError(error, submission);
  }

  // revalidate feedback page and redirect to feedback page
  revalidatePath(`${APP_ROUTES.FEEDBACK}/${id}`);
  redirect(`${APP_ROUTES.FEEDBACK}/${id}`);
};

export const deleteFeedback = async (
  id: string
): Promise<{
  status: "error" | "success";
  message: string;
}> => {
  const session = await auth();
  const user = session?.user ?? null;

  // redirect to login if user is not authenticated
  if (user === null) return redirect(APP_ROUTES.LOGIN);

  try {
    // check if feedback exists
    const feedback = await prisma.feedback.findUnique({
      where: { id: id },
      select: { user: { select: { id: true } } },
    });

    // throw error if feedback does not exist
    if (!feedback) {
      return {
        status: "error",
        message: errorMessages.resource_not_found,
      };
    }

    // throw error if user is not the owner of the feedback
    if (feedback.user.id !== user.id) {
      return {
        status: "error",
        message: errorMessages.unauthorized_feedback_delete,
      };
    }

    // delete feedback
    await prisma.feedback.delete({
      where: { id: id },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "error",
        message: error.message,
      };
    }
    return {
      status: "error",
      message: errorMessages.unexpected_error,
    };
  }

  // revalidate dashboard page and redirect to dashboard
  revalidatePath(APP_ROUTES.DASHBOARD);
  redirect(APP_ROUTES.DASHBOARD);
};

export const createComment = async (
  feedbackId: string,
  prevState: unknown,
  formData: FormData
) => {
  const session = await auth();
  const user = session?.user ?? null;

  const submission = parseWithZod(formData, {
    schema: CreateCommentSchema,
  });

  // redirect to login if user is not authenticated
  if (user === null) return redirect(APP_ROUTES.LOGIN);

  if (submission.status !== "success") return submission.reply();
  const { content } = submission.value;

  try {
    // create comment
    await prisma.comment.create({
      data: {
        content,
        userId: user.id as string,
        feedbackId: feedbackId,
      },
    });
  } catch (error) {
    handlePrismaError(error, submission);
  }

  // revalidate feedback page and redirect to feedback page
  revalidatePath(`${APP_ROUTES.FEEDBACK}/${feedbackId}`);
};

export const createReply = async (
  feedbackId: string,
  parentCommentId: string,
  prevState: unknown,
  formData: FormData
) => {
  const session = await auth();
  const user = session?.user ?? null;

  const submission = parseWithZod(formData, {
    schema: CreateCommentSchema,
  });

  // redirect to login if user is not authenticated
  if (user === null) return redirect(APP_ROUTES.LOGIN);

  if (submission.status !== "success") return submission.reply();

  // create reply
  const { content } = submission.value;
  try {
    await prisma.comment.create({
      data: {
        content,
        userId: user.id as string,
        feedbackId: feedbackId,
        parentId: parentCommentId,
      },
    });
  } catch (error) {
    handlePrismaError(error, submission);
  }

  // revalidate feedback page and redirect to feedback page
  revalidatePath(`${APP_ROUTES.FEEDBACK}/${feedbackId}`);
};

export const editReply = async (
  feedbackId: string,
  commentId: string,
  prevState: unknown,
  formData: FormData
) => {
  const session = await auth();
  const user = session?.user ?? null;

  const submission = parseWithZod(formData, {
    schema: CreateCommentSchema,
  });

  // redirect to login if user is not authenticated
  if (user === null) return redirect(APP_ROUTES.LOGIN);

  // reply with form errors if submission is not successful
  if (submission.status !== "success") return submission.reply();

  const { content } = submission.value;
  try {
    // check if comment exists
    const currentComment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { user: { select: { id: true } } },
    });

    // throw error if comment does not exist
    if (!currentComment) {
      return submission.reply({
        formErrors: [errorMessages.resource_not_found],
      });
    }
    // throw error if user is not the owner of the comment
    if (currentComment.user.id !== user.id) {
      return submission.reply({
        formErrors: [errorMessages.unauthorized_feedback_edit],
      });
    }
    // update comment
    await prisma.comment.update({
      where: { id: commentId },
      data: {
        content,
      },
    });
  } catch (error) {
    handlePrismaError(error, submission);
  }

  // revalidate feedback page and redirect to feedback page
  revalidatePath(`${APP_ROUTES.FEEDBACK}/${feedbackId}`);
};

export const deleteComment = async (prevState: unknown, formData: FormData) => {
  const session = await auth();
  const user = session?.user ?? null;

  const submission = parseWithZod(formData, {
    schema: DeleteCommentSchema,
  });

  // redirect to login if user is not authenticated
  if (user === null) return redirect(APP_ROUTES.LOGIN);

  // reply with form errors if submission is not successful
  if (submission.status !== "success") return submission.reply();

  const { commentId, feedbackId } = submission.value;
  try {
    // check if comment exists
    const currentComment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { user: { select: { id: true } } },
    });

    // throw error if comment does not exist
    if (!currentComment) {
      return submission.reply({
        formErrors: [errorMessages.resource_not_found],
      });
    }

    // throw error if user is not the owner of the comment
    if (currentComment?.user.id !== user.id) {
      return submission.reply({
        formErrors: [errorMessages.unauthorized_feedback_edit],
      });
    }

    // delete comment
    await prisma.comment.delete({
      where: { id: commentId },
    });
  } catch (error) {
    handlePrismaError(error, submission);
  }

  // revalidate feedback page and redirect to feedback page
  revalidatePath(`${APP_ROUTES.FEEDBACK}/${feedbackId}`);
};

export const addVotes = async (feedbackId: string) => {
  const session = await auth();
  const user = session?.user ?? null;

  // redirect to login if user is not authenticated
  if (user === null) {
    redirect(APP_ROUTES.LOGIN);
  }

  try {
    // check if feedback exists
    const currentFeedback = await prisma.feedback.findUnique({
      where: { id: feedbackId },
      include: { likes: true },
    });

    // throw error if feedback does not exist
    if (!currentFeedback) {
      return {
        success: false,
        message: errorMessages.resource_not_found,
        votes: 0,
      };
    }

    // check if user has already voted
    const existingVote = await prisma.like.findUnique({
      where: {
        userId_feedbackId: {
          userId: user.id as string,
          feedbackId: feedbackId,
        },
      },
    });

    if (existingVote) {
      // User has already voted, so we'll remove their vote
      await prisma.like.delete({
        where: {
          id: existingVote.id,
        },
      });

      const updatedVotes = currentFeedback.likes.length - 1;

      revalidatePath(`${APP_ROUTES.FEEDBACK}/${feedbackId}`);

      return {
        success: true,
        message: "Vote removed successfully",
        votes: updatedVotes,
      };
    } else {
      // User hasn't voted yet, so we'll add their vote
      await prisma.like.create({
        data: {
          userId: user.id as string,
          feedbackId,
        },
      });

      const updatedVotes = currentFeedback.likes.length + 1;

      revalidatePath(`${APP_ROUTES.FEEDBACK}/${feedbackId}`);

      return {
        success: true,
        message: "Vote added successfully",
        votes: updatedVotes,
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
        votes: 0,
      };
    }
    return {
      success: false,
      message: errorMessages.unexpected_error,
      votes: 0,
    };
  }
};
