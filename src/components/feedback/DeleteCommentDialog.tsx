"use client";

import { deleteComment } from "@/actions/feedback.action";
import { DeleteCommentSchema } from "@/schema/feedback.schema";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import AnimatedButton from "../common/AnimatedButton";
import FormError from "../forms/FormError";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type DeleteCommentDialogProps = {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  feedbackId: string;
  commentId: string;
};

const DeleteCommentDialog = ({
  openDialog,
  setOpenDialog,
  commentId,
  feedbackId,
}: DeleteCommentDialogProps) => {
  const [lastResult, action, isPending] = useActionState(
    deleteComment,
    undefined
  );

  const [form] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: DeleteCommentSchema,
      });
    },
  });

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this comment? This action cannot be
            undone. The comment will be permanently removed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-4 md:gap-2 justify-end">
          <DialogClose asChild>
            <Button type="button" variant="tertiary-action">
              Cancel
            </Button>
          </DialogClose>
          <form
            action={action}
            id={form.id}
            onSubmit={form.onSubmit}
            noValidate
          >
            <input type="hidden" name="commentId" value={commentId} />
            <input type="hidden" name="feedbackId" value={feedbackId} />
            <AnimatedButton
              isPending={isPending}
              type="submit"
              variant="danger"
              title=" Delete"
              className="w-full"
            />

            <FormError errors={form.errors} errorId={form.errorId} />
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCommentDialog;
