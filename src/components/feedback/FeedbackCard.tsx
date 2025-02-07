"use client";

import { addVotes } from "@/actions/feedback.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FeedbackType } from "@/types/feedback.types";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ArrowUp, Clock } from "lucide-react";
import Link from "next/link";
import { useOptimistic, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { Badge } from "../ui/badge";

dayjs.extend(relativeTime);

type FeedbackCardProps = {
  item: FeedbackType;
  disableLink?: boolean;
};

function FeedbackCard({ item, disableLink }: FeedbackCardProps) {
  const [hasVoted, setHasVoted] = useState(false);
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    item.numberOfLikes
  );
  const [isPending, startTransition] = useTransition();

  const handleVote = () => {
    startTransition(async () => {
      const optimisticValue = hasVoted ? -1 : 1;
      setOptimisticLikes((prev) => prev + optimisticValue);
      setHasVoted((prev) => !prev);

      const result = await addVotes(item.id);
      if (!result.success) {
        setOptimisticLikes((prev) => prev - optimisticValue);
        setHasVoted((prev) => !prev);
        toast.error(result.message, {
          duration: 3000,
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
      } else {
        setOptimisticLikes(result.votes);
      }
    });
  };

  const getEngagementLevel = (optimisticLikes: number) => {
    if (optimisticLikes >= 75)
      return { color: "bg-green-500", text: "High Priority" };
    if (optimisticLikes >= 40)
      return { color: "bg-blue-500", text: "Medium Priority" };
    return { color: "bg-slate-500", text: "Under Evaluation" };
  };

  const engagementStatus = getEngagementLevel(optimisticLikes);
  const avartarFallback = item.user.name
    ? item.user.name?.charAt(0)?.toUpperCase()
    : item.user.email?.charAt(0)?.toUpperCase();
  const nameFromEmail = item.user.email.split("@")[0];
  const name = item.user.name ?? nameFromEmail;
  const userImage = item.user.image ?? "";

  return (
    <Card className="w-full card overflow-hidden shadow-none">
      <div className="flex flex-col-reverse md:flex-row gap-4 p-4">
        {/* Vote Column */}
        <Button
          variant="badge"
          className="py-3 flex self-start md:py-8 md:flex-col items-center justify-center gap-1 transition-hover duration-250 ease-smooth"
          disabled={isPending}
          onClick={() => handleVote()}
        >
          <ArrowUp />
          <span>{optimisticLikes}</span>
        </Button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* User Info */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={userImage} alt={name} />
                <AvatarFallback>{avartarFallback}</AvatarFallback>
              </Avatar>
              <span className="h4-bold text-text-primary capitalize">
                {name}
              </span>
            </div>
            <span className="text-sm flex items-center gap-1">
              {dayjs(item.createdAt).fromNow()}
              <Clock className="w-3 h-3" />
            </span>
          </div>

          {/* Title and Description */}

          <h3 className="h3-bold text-text-primary mb-1 hover:text-brand-primary transition-hover duration-250 ease-smooth cursor-pointer truncate">
            <Link
              className={clsx({
                "pointer-events-none": disableLink,
              })}
              href={`/feedback/${item.id}`}
            >
              {item.title}
            </Link>
          </h3>
          <p className="mb-4">{item.description}</p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge
                tabIndex={0}
                variant="category"
                className={clsx("capitalize pointer-events-none", {
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
              <span className="font-bold">{item.numberOfComments}</span>
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
          style={{ width: `${(optimisticLikes / 100) * 100}%` }}
        />
      </div>
    </Card>
  );
}
export default FeedbackCard;
