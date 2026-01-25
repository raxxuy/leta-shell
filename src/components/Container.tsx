import { type Accessor, createComputed } from "ags";
import clsx from "clsx/lite";
import { access } from "@/lib/utils";

type ContainerProps = JSX.IntrinsicElements["box"] & {
  class?: string | Accessor<string>;
  cssClasses?: string[] | Accessor<string[]>;
};

const baseStyles = clsx(
  "rounded-2xl border-2 border-background-lighter bg-background-dark p-4 shadow-md m-[5px_10px_15px]",
);

export default function Container({
  class: classProp,
  cssClasses: cssClassesProp,
  ...props
}: ContainerProps) {
  const className = createComputed(() => {
    const className = access(classProp);
    const cssClasses = access(cssClassesProp);
    return clsx(baseStyles, className, cssClasses);
  });

  return <box class={className} {...props} />;
}
