import CommentList from "@/components/feedback/CommentList";
import { getFeedbackCommentsById } from "@/data/feedback.data";
import { isEmpty } from "lodash";
import { notFound } from "next/navigation";

type CommentsListWrapperProps = {
  feedbackId: string;
};
const CommentsListWrapper = async ({
  feedbackId,
}: CommentsListWrapperProps) => {
  const commentsList = await getFeedbackCommentsById(feedbackId);

  if (!commentsList) {
    notFound();
  }

  const renderComments = () => {
    if (isEmpty(commentsList.comments)) return null;
    return (
      <CommentList
        key={commentsList["numberOfComments"]}
        comments={commentsList["comments"]}
        feedbackId={feedbackId}
        numberOfComments={commentsList["numberOfComments"]}
      />
    );
  };

  return renderComments();
};

export default CommentsListWrapper;
