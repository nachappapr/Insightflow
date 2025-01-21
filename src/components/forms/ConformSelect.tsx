import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  unstable_useControl as useControl,
  type FieldMetadata,
} from "@conform-to/react";
import clsx from "clsx";
import { ComponentProps, useRef, type ComponentRef } from "react";

export const SelectConform = ({
  meta,
  items,
  placeholder,
  ...props
}: {
  meta: FieldMetadata<string>;
  items: Array<{ name: string; value: string }>;
  placeholder: string;
} & ComponentProps<typeof Select>) => {
  const selectRef = useRef<ComponentRef<typeof SelectTrigger>>(null);
  const control = useControl(meta);

  return (
    <>
      <select
        name={meta.name}
        defaultValue={meta.initialValue ?? ""}
        className="sr-only"
        ref={control.register}
        aria-hidden
        tabIndex={-1}
        onFocus={() => {
          selectRef.current?.focus();
        }}
      >
        <option value="" />
        {items.map((option) => (
          <option key={option.value} value={option.value} />
        ))}
      </select>

      <Select
        {...props}
        value={control.value ?? ""}
        onValueChange={control.change}
        onOpenChange={(open) => {
          if (!open) {
            control.blur();
          }
        }}
      >
        <SelectTrigger
          className={clsx("h-12 capitalize", {
            "border-error border-solid focus:border-none": meta.errors?.length,
          })}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => {
            return (
              <SelectItem
                className={clsx({
                  uppercase: item.name.length <= 2,
                  capitalize: item.name.length > 2,
                })}
                key={item.value}
                value={item.value}
              >
                {item.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
};
