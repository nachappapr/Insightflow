"use server";

import { prisma } from "../../prisma";

type SortOption =
  | "most upvotes"
  | "least upvotes"
  | "most comments"
  | "least comments";

type OrderByConfig = {
  likes?: { _count: "desc" | "asc" };
  comments?: { _count: "desc" | "asc" };
};

export const getFeedbackCount = async () => {
  return await prisma.feedback.count();
};

export const getAllFeedbackDetails = async (
  userId: string,
  sortBy?: string
) => {
  const orderBy: Record<SortOption, OrderByConfig> = {
    "most upvotes": { likes: { _count: "desc" } },
    "least upvotes": { likes: { _count: "asc" } },
    "most comments": { comments: { _count: "desc" } },
    "least comments": { comments: { _count: "asc" } },
  };

  const response = await prisma.feedback.findMany({
    where: { userId: userId },
    orderBy: orderBy[sortBy as SortOption] ?? orderBy["most upvotes"],
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      status: {
        select: { id: true, name: true },
      },
      user: {
        select: {
          id: true,
          name: true,
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

  return response.map(({ _count, ...rest }) => ({
    ...rest,
    numberOfLikes: _count.likes,
    numberOfComments: _count.comments,
  }));
};

export const getFeedbackDetailsById = async (feedbackId: string) => {
  const response = await prisma.feedback.findUnique({
    where: { id: feedbackId },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      status: {
        select: {
          name: true,
          id: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
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

  return {
    ...response,
    numberOfLikes: response._count.likes,
    numberOfComments: response._count.comments,
  };
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

export const getFeedbackCommentsById = async (id: string) => {
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
