export const Categories = [
  "All",
  "UI",
  "UX",
  "Enhancement",
  "Bug",
  "Feature",
] as const;

export const Statuses = ["planned", "in-progress", "live"] as const;
export const SortOptions = [
  "Most Upvotes",
  "Least Upvotes",
  "Most Comments",
  "Least Comments",
] as const;

export const mockFeedback = [
  {
    id: 1,
    title: "Q&A within the challenge hubs",
    description: "Challenge-specific Q&A would make for easy reference.",
    votes: 65,
    author: {
      name: "Mike Tobby",
      avatar: "https://github.com/shadcn.png",
      initials: "MT",
    },
    timeAgo: "5h ago",
    type: "Feature",
    comments: 1,
  },
  {
    id: 2,
    title: "Allow image/video upload",
    description: "Images and screencasts can enhance comments on solutions.",
    votes: 52,
    author: {
      name: "John Doe",
      avatar: "https://github.com/shadcn.png",
      initials: "JD",
    },
    timeAgo: "2h ago",
    type: "Enhancement",
    comments: 2,
  },
];
