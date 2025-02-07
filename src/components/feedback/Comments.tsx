"use client";
import type { CommentType } from "@/types/feedback.types";
import { AnimatePresence } from "motion/react";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import AddReplies from "../forms/AddReplies";
import CommentEditor from "../forms/EditComment";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CommentActionMenu from "./CommentActionMenu";
import DeleteCommentDialog from "./DeleteCommentDialog";

type CommentsProps = {
  feedbackId: string;
  comment: CommentType;
  isReply?: boolean;
  depth?: number;
};

const Comments = ({
  comment,
  feedbackId,
  isReply = false,
  depth = 0,
}: CommentsProps) => {
  const { data } = useSession();
  const currentUserId = data?.user?.id;
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleReply = useCallback(
    () => setIsReplying((prevState) => !prevState),
    []
  );
  const handleReplySuccess = useCallback(() => setIsReplying(false), []);
  const handleEdit = () => setIsEditing((prevState) => !prevState);
  const handleDelete = () => setIsDeleteModalOpen((prevState) => !prevState);
  const handleEditComplete = useCallback(() => setIsEditing(false), []);

  const isFirstLevelReply = depth === 1;
  const replyButtonLabel = isReplying ? "Cancel" : "Reply";
  const canReply = comment.user.id !== currentUserId;

  const avartarFallback = comment.user.name
    ? comment.user.name?.charAt(0)
    : comment.user.email?.charAt(0);
  const nameFromEmail = comment.user.email.split("@")[0];
  const name = comment.user.name ?? nameFromEmail;
  const username = comment.user.username ?? nameFromEmail;
  const userImage = comment.user.image ?? "";

  const renderReplyButton = () => {
    if (canReply) {
      return (
        <button
          onClick={handleReply}
          className="body3-semibold text-brand-primary hover:text-brand-light transition-fast h-auto p-0 link-underline"
        >
          {replyButtonLabel}
        </button>
      );
    }
  };

  return (
    <div className={isReply && isFirstLevelReply ? "ml-12 md:ml-24" : ""}>
      <div className="grid grid-cols-[40px,2fr,1fr] gap-4 items-start md:gap-x-8 md:gap-y-4 ">
        <Avatar className="h-10 w-10">
          <AvatarImage src={userImage} alt={name} />
          <AvatarFallback>{avartarFallback}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="h4-bold text-text-primary">{name}</h4>
          <p className="h4-bold !font-normal">@{username}</p>
        </div>
        <div className="justify-self-end">
          {renderReplyButton()}
          <CommentActionMenu onEdit={handleEdit} onDelete={handleDelete} />
        </div>
        <div className="md:col-start-2 col-span-full">
          <CommentEditor
            feedbackId={feedbackId}
            key={`${comment.id}-${comment.updatedAt}`}
            commentId={comment.id}
            content={comment.content}
            onEditComplete={handleEditComplete}
            isEditing={isEditing}
          />
        </div>

        <AnimatePresence>
          {isReplying ? (
            <div className="md:col-start-2 col-span-full">
              <AddReplies
                feedbackId={feedbackId}
                parentCommentId={comment.id}
                onSuccess={handleReplySuccess}
              />
            </div>
          ) : null}
        </AnimatePresence>
      </div>
      <DeleteCommentDialog
        openDialog={isDeleteModalOpen}
        setOpenDialog={setIsDeleteModalOpen}
        commentId={comment.id}
        feedbackId={feedbackId}
      />
      {comment?.replies?.map((reply, index) => {
        return (
          <Comments
            key={reply.id || index}
            comment={reply}
            feedbackId={feedbackId}
            isReply={true}
            depth={depth + 1}
          />
        );
      })}
    </div>
  );
};

export default Comments;
