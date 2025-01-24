"use server";

import { prisma } from "../../prisma";

export const getAllFeedback = async (userId: string) => {
  const response = await prisma.feedback.findMany({
    where: { userId: userId },
    select: {
      id: true,
      title: true,
      category: { select: { name: true } },
      description: true,
      status: { select: { name: true } },
      createdAt: true,
      user: { select: { name: true, email: true } },
      comments: {
        select: {
          id: true,
          content: true,
        },
      },
      _count: { select: { likes: true } },
    },
  });

  return response.map(({ _count, ...rest }) => ({
    ...rest,
    numberOfLikes: _count.likes,
  }));
};

export const getAllCategories = async () => {
  return await prisma.feedbackCategory.findMany({
    select: {
      name: true,
      id: true,
    },
  });
};

export const getAllStatuses = async () => {
  const response = await prisma.feedbackStatus.findMany({
    select: {
      name: true,
      id: true,
      color: true,
      _count: { select: { feedbacks: true } },
    },
  });
  return response.map(({ _count, ...rest }) => ({
    ...rest,
    numberOfFeedback: _count.feedbacks,
  }));
};

export const getFeedbackById = async (id: string) => {
  // Define recursive comment selection structure
  const commentSelect = {
    id: true,
    content: true,
    createdAt: true,
    updatedAt: true,
    user: {
      select: {
        name: true,
        email: true,
        id: true,
      },
    },
  } as const;

  // Create type to allow recursive selection
  type CommentSelect = typeof commentSelect & {
    replies?: {
      select: CommentSelect;
    };
  };

  // Build the recursive selection
  const fullCommentSelect: CommentSelect = {
    ...commentSelect,
    replies: {
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        replies: {
          select: commentSelect,
        },
      },
    },
  };

  const response = await prisma.feedback.findUnique({
    where: { id: id },
    select: {
      id: true,
      title: true,
      category: { select: { name: true, id: true } },
      description: true,
      status: { select: { name: true, id: true } },
      createdAt: true,
      user: { select: { name: true, email: true, id: true } },
      comments: {
        where: {
          parentId: null, // Only get top-level comments
        },
        orderBy: {
          createdAt: "asc",
        },
        select: {
          ...fullCommentSelect,
          replies: {
            orderBy: {
              createdAt: "asc",
            },
            select: {
              ...fullCommentSelect,
              replies: {
                orderBy: {
                  createdAt: "asc",
                },
                select: fullCommentSelect,
              },
            },
          },
        },
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });

  if (!response) return null;

  const updatedResponse = {
    ...response,
    numberOfLikes: response._count.likes,
    numberOfComments: response._count.comments,
  };

  return updatedResponse;
};
