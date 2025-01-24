export const errorMessages = {
  create_feedback_failed: "Failed to create feedback, please try again",
  unique_feedback_error:
    "A unique constraint violation occurred. This feedback might already exist.",
  foreign_key_error:
    "A foreign key constraint failed. Please check your category, status, or user ID.",
  unexpected_error: "An unexpected error occurred. Please try again later.",
  unauthorized_feedback_edit: "You are not authorized to edit this feedback",
  unauthorized_feedback_delete:
    "You are not authorized to delete this feedback",
  resource_not_found: "The requested resource was not found",
  already_voted: "You have already voted for this feedback",
};
