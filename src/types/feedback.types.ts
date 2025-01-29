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
  replies?: CommentType[]; // Recursive type for nested replies
};

export type FeedbackType = {
  numberOfLikes: number;
  numberOfComments: number;
  user: {
    name: string | null;
    id: string;
  };
  id: string;
  createdAt: Date;
  title: string;
  description: string;
  category: { id: string; name: string };
  status: { id: string; name: string };
};

export type AllFeedbackItemType = {
  id: string;
  title: string;
  category: { name: string };
  description: string;
  status: { name: string };
  createdAt: Date;
  user: User;
  comments: { id: string; content: string }[];
  _count?: { likes: number; comments: number };
  numberOfLikes: number;
  numberOfComments: number;
};
