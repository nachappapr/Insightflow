"use client";

import { createReply } from "@/actions/feedback.action";
import { CreateCommentSchema } from "@/schema/feedback.schema";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { isEqual } from "lodash";
import { motion } from "motion/react";
import { useActionState, useEffect } from "react";
import AnimatedButton from "../common/AnimatedButton";
import { Textarea } from "../ui/textarea";
import FormError from "./FormError";

type AddRepliesProps = {
  feedbackId: string;
  parentCommentId: string;
  onSuccess: () => void;
};
const AddReplies = ({
  feedbackId,
  parentCommentId,
  onSuccess,
}: AddRepliesProps) => {
  const createReplyAction = createReply.bind(null, feedbackId, parentCommentId);
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
  });
  useEffect(() => {
    if (isEqual(lastResult?.status, "success")) {
      onSuccess();
    }
  }, [lastResult?.status, onSuccess]);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="mb-8"
    >
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
          <AnimatedButton
            variant="primaryAction"
            isPending={isPending}
            disabled={isPending}
            title="Post Reply"
          />
        </div>
      </form>
    </motion.div>
  );
};

export default AddReplies;
