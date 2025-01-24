"use client";

import { deleteFeedback } from "@/actions/feedback.action";
import { useActionState, useEffect } from "react";
import AnimatedButton from "../common/AnimatedButton";
import toast from "react-hot-toast";

const intialState: { status: "idle" | "error" | "success"; message: string } = {
  status: "idle",
  message: "",
};
const DeleteForm = ({ feedbackId }: { feedbackId: string }) => {
  const deleteFeedbackAction = deleteFeedback.bind(null, feedbackId);
  const [state, action, isPending] = useActionState(
    deleteFeedbackAction,
    intialState
  );

  useEffect(() => {
    if (state.status === "error") {
      toast.error(state.message, {
        duration: 3000,
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    }
  }, [state]);

  return (
    <form action={action}>
      <AnimatedButton
        title="Delete"
        variant="danger"
        type="submit"
        isPending={isPending}
        className="w-full"
      />
    </form>
  );
};

export default DeleteForm;
