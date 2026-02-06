import { type Accessor, createComputed } from "ags";
import clsx from "clsx/lite";
import { access } from "@/utils";

type ContainerProps = JSX.IntrinsicElements["box"] & {
  initCss?: boolean;
  class?: string | Accessor<string>;
  cssClasses?: string[] | Accessor<string[]>;
};

const baseStyles = clsx(
  "rounded-2xl border-2 border-primary bg-background-dark p-4 shadow-md m-[5px_10px_15px]",
);

export default function Container({
  initCss: initCssProp = true,
  class: classProp,
  cssClasses: cssClassesProp,
  ...props
}: ContainerProps) {
  const className = createComputed(() => {
    const initCss = initCssProp ? baseStyles : "";
    const className = access(classProp);
    const cssClasses = access(cssClassesProp);
    return clsx(initCss, className, cssClasses);
  });

  return <box class={className} {...props} />;
}
