"use client";

import DeleteForm from "../forms/DeleteForm";
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

type DeleteFeedbackDialogProps = {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  feedbackId: string;
};

const DeleteFeedbackDialog = ({
  openDialog,
  setOpenDialog,
  feedbackId,
}: DeleteFeedbackDialogProps) => {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="form-width">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription className="flex flex-col gap-2 w-full">
            <span>
              Are you sure you want to delete the feedback:{" "}
              <span className="h4-bold">&quot;{feedbackId}</span>
              &quot;?
            </span>
            <span>
              This action cannot be undone. The feedback and all associated
              comments will be permanently removed.
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-4 md:gap-2 justify-end">
          <DialogClose asChild>
            <Button type="button" variant="tertiary-action">
              Cancel
            </Button>
          </DialogClose>
          <DeleteForm feedbackId={feedbackId} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteFeedbackDialog;
