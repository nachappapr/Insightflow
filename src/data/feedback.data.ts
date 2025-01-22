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
  return await prisma.feedback.findUnique({
    where: { id: id },
    select: {
      id: true,
      title: true,
      category: { select: { name: true, id: true } },
      description: true,
      status: { select: { name: true, id: true } },
      createdAt: true,
      user: { select: { name: true, email: true } },
    },
  });
};
