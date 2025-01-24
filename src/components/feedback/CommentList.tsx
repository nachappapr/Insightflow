import type { CommentType } from "@/types/feedback.types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Comments from "./Comments";

type CommentListProps = {
  comments: CommentType[];
  feedbackId: string;
  numberOfComments: number;
};
const CommentList = ({
  comments,
  feedbackId,
  numberOfComments,
}: CommentListProps) => {
  return (
    <Card className="border-none my-6 card">
      <CardHeader>
        <CardTitle className="h3-bold text-text-primary">
          {numberOfComments} Comments
        </CardTitle>
      </CardHeader>
      <CardContent>
        {comments.map((comment, index) => (
          <div
            key={index}
            className="border-b border-text-light/25 last:border-b-0 mb-4"
          >
            <Comments comment={comment} feedbackId={feedbackId} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CommentList;
