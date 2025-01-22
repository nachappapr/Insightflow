"use client";

import { editFeedback } from "@/actions/feedback.action";
import { FeedbackSchema } from "@/schema/feedback.schema";
import type {
  Feedback,
  FeedbackCategories,
  FeedbackStatus,
} from "@/types/feedback.types";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import clsx from "clsx";
import { useActionState } from "react";
import EditFeedbackIcon from "../icons/EditFeedbackIcon";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { SelectConform } from "./ConformSelect";
import DeleteForm from "./DeleteForm";
import FormError from "./FormError";

type EditFeedbackFormProps = {
  categories: FeedbackCategories[];
  statuses: FeedbackStatus[];
  feedback: Feedback;
};

const EditFeedbackForm = ({
  categories,
  statuses,
  feedback,
}: EditFeedbackFormProps) => {
  const { id, title, description, status, category } = feedback || {};
  const editFeedbackAction = editFeedback.bind(null, feedback?.id);
  const [lastResult, action, isPending] = useActionState(
    editFeedbackAction,
    undefined
  );

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: FeedbackSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    defaultValue: {
      title: title,
      description: description,
      status: status?.id,
      category: category?.id,
    },
  });

  const formTitle = `Editing ${title}`;
  return (
    <div className="bg-white rounded-lg relative mt-10">
      <div className="absolute top-[-26px] left-6">
        <EditFeedbackIcon />
      </div>
      <div className="p-10">
        <h1 className="h1-bold text-text-primary mb-6">{formTitle}</h1>
        <form
          id={form.id}
          onSubmit={form.onSubmit}
          action={action}
          noValidate
          className="flex flex-col justify-center gap-6"
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <Label
                htmlFor={fields.title.id}
                className="h4-bold text-text-primary"
              >
                Feedback Title
              </Label>
              <small className="h4-bold !font-normal">
                Add a short, descriptive headline
              </small>
            </div>
            <Input
              id={fields.title.id}
              name={fields.title.name}
              defaultValue={fields.title.initialValue}
              className={clsx("h-12", {
                "border-error border-solid focus:border-none":
                  fields.title.errors?.length,
              })}
            />
            <FormError errors={fields.title.errors} errorId={fields.title.id} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <Label
                htmlFor={fields.category.id}
                className="h4-bold text-text-primary"
              >
                Category
              </Label>
              <small className="h4-bold !font-normal">
                Choose a category for your feedback
              </small>
            </div>
            <SelectConform
              placeholder="Select a category"
              meta={fields.category}
              items={categories.map(({ id, name }) => ({
                name,
                value: id,
              }))}
              defaultValue={fields.category.initialValue}
            />
            <FormError
              errors={fields.category.errors}
              errorId={fields.category.id}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label
                htmlFor={fields.status.id}
                className="h4-bold text-text-primary"
              >
                Status
              </label>
              <small className="h4-bold !font-normal">
                Change feedback state
              </small>
            </div>
            <SelectConform
              placeholder="Select a status"
              meta={fields.status}
              items={statuses.map(({ id, name }) => ({
                name,
                value: id,
              }))}
            />
            <FormError
              errors={fields.status.errors}
              errorId={fields.status.id}
            />
            <div className="pt-4">
              <FormError errors={form.errors} errorId={form.errorId} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label
                htmlFor={fields.description.id}
                className="h4-bold text-text-primary"
              >
                Feedback Detail
              </label>
              <small className="h4-bold !font-normal">
                Include any specific comments on what should be improved, added,
                etc.
              </small>
            </div>
            <Textarea
              id={fields.description.id}
              name={fields.description.name}
              className={clsx("h-12", {
                "border-error border-solid focus:border-none":
                  fields.description.errors?.length,
              })}
              defaultValue={fields.title.initialValue}
            />
            <FormError
              errors={fields.description.errors}
              errorId={fields.description.id}
            />
          </div>
        </form>
        <div className="flex justify-between items-center mt-4">
          <DeleteForm feedbackId={id} />
          <div className="flex flex-col-reverse justify-center gap-4 mt-4 md:flex-row md:justify-end">
            <Button variant="tertiary-action" type="reset" disabled={isPending}>
              Cancel
            </Button>
            <Button
              variant="primaryAction"
              type="submit"
              disabled={isPending}
              form={form.id}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFeedbackForm;
