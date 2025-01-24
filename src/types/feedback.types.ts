export type FeedbackCategories = { name: string; id: string };
export type FeedbackStatus = {
  name: string;
  id: string;
  color: string | null;
  numberOfFeedback: number;
};

export type User = {
  name: string | null;
  email: string;
  id: string;
};

export type CommentType = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  replies: CommentType[]; // Recursive type for nested replies
};

export type FeedbackItemType = {
  id: string;
  title: string;
  category: { name: string; id: string };
  description: string;
  status: { name: string; id: string };
  createdAt: Date;
  user: User;
  comments: CommentType[];
  _count?: { likes: number; comments: number };
  numberOfLikes: number;
  numberOfComments: number;
};
