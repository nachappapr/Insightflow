"use client";

import { createComment } from "@/actions/feedback.action";
import { CreateCommentSchema } from "@/schema/feedback.schema";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import clsx from "clsx";
import { useActionState } from "react";
import AnimatedButton from "../common/AnimatedButton";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import FormError from "./FormError";
import { getRemainingWordCount } from "@/lib/utils";

type AddCommentsProps = {
  feedbackId: string;
};

const AddComments = ({ feedbackId }: AddCommentsProps) => {
  const createCommentAction = createComment.bind(null, feedbackId);
  const [lastResult, action, isPending] = useActionState(
    createCommentAction,
    undefined
  );
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: CreateCommentSchema });
    },
  });
  const remainingWordCount = getRemainingWordCount(fields.content.value, 1000);

  return (
    <Card className="pt-6 pb-8 border-none card">
      <CardContent>
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
          <div>
            <Label
              htmlFor={fields.content.id}
              className="h3-bold inline-block text-text-primary mb-6"
            >
              Add Comment
            </Label>
            <Textarea
              id={fields.content.id}
              rows={6}
              name={fields.content.name}
              defaultValue={fields.content.initialValue}
              className={clsx({
                "border-error border-solid focus:border-none":
                  fields.content.errors?.length,
              })}
            ></Textarea>
            <FormError
              errors={fields.content.errors}
              errorId={fields.content.errorId}
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="body2-regular">
              {remainingWordCount} characters left
            </p>
            <AnimatedButton
              variant="primaryAction"
              type="submit"
              isPending={isPending}
              disabled={isPending}
              title="Post Comment"
            >
              Post Comment
            </AnimatedButton>
          </div>
          <FormError errors={form.errors} errorId={form.errorId} />
        </form>
      </CardContent>
    </Card>
  );
};

export default AddComments;
