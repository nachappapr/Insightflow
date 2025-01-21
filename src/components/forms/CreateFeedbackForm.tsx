"use client";

import { createFeedback } from "@/actions/feedback";
import { CreateFeedbackSchema } from "@/schema/feedback.schema";
import type {
  FeedbackCategories,
  FeedbackStatus,
} from "@/types/feedback.types";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import clsx from "clsx";
import { useActionState } from "react";
import NewFeedbackIcon from "../icons/NewFeedbackIcon";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { SelectConform } from "./ConformSelect";
import FormError from "./FormError";

type CreateFeedbackFormProps = {
  title: string;
  categories: FeedbackCategories[];
  statuses: FeedbackStatus[];
};

const CreateFeedbackForm = ({
  title,
  categories,
  statuses,
}: CreateFeedbackFormProps) => {
  const [lastResult, action, isPending] = useActionState(
    createFeedback,
    undefined
  );

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: CreateFeedbackSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <div className="bg-white rounded-lg relative mt-10">
      <div className="absolute top-[-26px] left-6">
        <NewFeedbackIcon />
      </div>
      <div className="p-10">
        <h1 className="h1-bold text-text-primary mb-6">{title}</h1>
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
            />
            <FormError
              errors={fields.description.errors}
              errorId={fields.description.id}
            />
          </div>
          <div>
            <div className="flex flex-col-reverse justify-center gap-4 mt-4 md:flex-row md:justify-end">
              <Button
                variant="tertiary-action"
                type="reset"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                variant="primaryAction"
                type="submit"
                disabled={isPending}
              >
                Add Feedback
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFeedbackForm;
