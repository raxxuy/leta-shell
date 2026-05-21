import clsx from "clsx/lite";
import { createReactiveMemo } from "@/lib/reactive";
import type { Reactive } from "@/types/reactive";

type InputType = "text" | "number";
type InputValue<T extends InputType> = T extends "number" ? number : string;

interface InputFieldProps<T extends InputType = "text"> {
  class?: Reactive<string>;
  maxLength?: Reactive<number>;
  onChange: (v: InputValue<T>) => void;
  placeholder?: Reactive<string>;
  type?: T;
  value: Reactive<InputValue<T>>;
}

export default function InputField<T extends InputType = "text">({
  type,
  value,
  onChange,
  placeholder,
  maxLength,
  class: classProp,
}: InputFieldProps<T>) {
  const text = createReactiveMemo(value as Reactive<string | number>, String);
  const className = createReactiveMemo(classProp ?? "", (v) =>
    clsx("rounded-lg px-3 py-1.5 font-medium text-sm", v),
  );

  return (
    <entry
      class={className}
      maxLength={maxLength}
      onNotifyText={(self) => {
        if (type === "number") {
          const n = Number(self.text);
          if (!Number.isNaN(n)) (onChange as (v: number) => void)(n);
        } else {
          (onChange as (v: string) => void)(self.text);
        }
      }}
      placeholderText={placeholder}
      text={text}
    />
  );
}
