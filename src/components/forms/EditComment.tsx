"use client";

import { editReply } from "@/actions/feedback.action";
import { CreateCommentSchema } from "@/schema/feedback.schema";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { isEqual } from "lodash";
import { AnimatePresence, motion } from "motion/react";
import { useActionState, useEffect } from "react";
import AnimatedButton from "../common/AnimatedButton";
import { Textarea } from "../ui/textarea";
import FormError from "./FormError";
import { Button } from "../ui/button";

type EditCommentProps = {
  commentId: string;
  feedbackId: string;
  content: string;
  isEditing: boolean;
  onEditComplete: () => void;
};

const animationProps = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
  transition: { duration: 0.2 },
};

const CommentEditor = ({
  feedbackId,
  commentId,
  content,
  isEditing,
  onEditComplete,
}: EditCommentProps) => {
  const createReplyAction = editReply.bind(null, feedbackId, commentId);
  const [lastResult, action, isPending] = useActionState(
    createReplyAction,
    undefined
  );
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: CreateCommentSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    defaultValue: {
      content,
    },
  });

  useEffect(() => {
    if (isEqual(lastResult?.status, "success")) {
      onEditComplete();
    }
  }, [lastResult?.status, onEditComplete]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isEditing ? (
        <motion.div key="edit-form" {...animationProps} className="mb-8">
          <form
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
            className="flex flex-col md:flex-row md:justify-between gap-4"
            noValidate
          >
            <div className="w-full flex flex-col">
              <Textarea
                id={fields.content.id}
                name={fields.content.name}
                defaultValue={fields.content.initialValue}
                rows={6}
              ></Textarea>
              <FormError
                errors={fields.content.errors}
                errorId={fields.content.errorId}
              />
              <FormError errors={form.errors} errorId={form.errorId} />
            </div>
            <div className="flex justify-end md:block">
              <div className="flex justify-end md:flex-col gap-2 w-full">
                <Button
                  variant="secondaryAction"
                  type="button"
                  disabled={isPending}
                  onClick={onEditComplete}
                >
                  Cancel
                </Button>
                <AnimatedButton
                  variant="primaryAction"
                  isPending={isPending}
                  disabled={isPending}
                  title="Post"
                  className="w-full"
                  form={form.id}
                  type="submit"
                />
              </div>
            </div>
          </form>
        </motion.div>
      ) : (
        <motion.div key="content" {...animationProps} className="mb-8">
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommentEditor;
