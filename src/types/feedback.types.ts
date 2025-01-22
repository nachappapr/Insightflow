export type FeedbackCategories = { name: string; id: string };
export type FeedbackStatus = {
  name: string;
  id: string;
  color: string | null;
  numberOfFeedback: number;
};

export type Feedback = {
  user: {
    name: string | null;
    email: string;
  };
  id: string;
  createdAt: Date;
  title: string;
  description: string;
  status: {
    name: string;
    id: string;
  };
  category: {
    name: string;
    id: string;
  };
};
