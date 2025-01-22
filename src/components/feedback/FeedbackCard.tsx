"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAllFeedback } from "@/data/feedback.data";
import clsx from "clsx";
import { ArrowUp, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "../ui/badge";

type VoteStatus = "up" | "down" | null;

type FeedbackItem = Awaited<ReturnType<typeof getAllFeedback>>[0];

function FeedbackCard({ item }: { item: FeedbackItem }) {
  const [votes, setVotes] = useState(item.numberOfLikes);
  const [voteStatus, setVoteStatus] = useState<VoteStatus>(null);

  const handleVote = (direction: "up" | "down") => {
    if (voteStatus === direction) {
      setVotes(direction === "up" ? votes - 1 : votes + 1);
      setVoteStatus(null);
    } else {
      setVotes(
        direction === "up"
          ? voteStatus === "down"
            ? votes + 2
            : votes + 1
          : voteStatus === "up"
          ? votes - 2
          : votes - 1
      );
      setVoteStatus(direction);
    }
  };

  const getEngagementLevel = (votes: number) => {
    if (votes >= 75) return { color: "bg-green-500", text: "High Priority" };
    if (votes >= 40) return { color: "bg-blue-500", text: "Medium Priority" };
    return { color: "bg-slate-500", text: "Under Evaluation" };
  };

  const engagementStatus = getEngagementLevel(votes);

  return (
    <Card className="w-full overflow-hidden shadow-none">
      <div className="flex gap-4 p-4">
        {/* Vote Column */}
        <Button
          variant="badge"
          className="py-8 flex flex-col items-center justify-center gap-1 transition-hover duration-250 ease-smooth"
          onClick={() => handleVote("up")}
        >
          <ArrowUp />
          <span>{item?.numberOfLikes}</span>
        </Button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* User Info */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={""} alt={item.user.name ?? ""} />
                <AvatarFallback>{item.user.name}</AvatarFallback>
              </Avatar>
              <span className="h4-bold text-text-primary">
                {item.user.name}
              </span>
            </div>
            <span className="text-sm text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {/* {item.createdAt} */}
            </span>
          </div>

          {/* Title and Description */}

          <h3 className="h3-bold text-text-primary mb-1 hover:text-brand-primary transition-hover duration-250 ease-smooth cursor-pointer truncate">
            <Link href={`/feedback/${item.id}`}>{item.title}</Link>
          </h3>
          <p className="text-text-secondary mb-4">{item.description}</p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge
                tabIndex={0}
                variant="category"
                className={clsx("capitalize", {
                  uppercase: item.category.name.length <= 2,
                  capitalize: item.category.name.length > 2,
                })}
              >
                {item.category.name}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-text-primary">
              <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z"
                  fill="#CDD2EE"
                  fillRule="nonzero"
                />
              </svg>
              <span className="font-bold">{item.comments?.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Engagement Progress Bar */}
      <div className="h-1 bg-slate-100">
        <div
          className={clsx(
            "h-full transition-all duration-300",
            engagementStatus.color
          )}
          style={{ width: `${(votes / 100) * 100}%` }}
        />
      </div>
    </Card>
  );
}
export default FeedbackCard;
