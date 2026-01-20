import { type Accessor, createComputed } from "ags";
import { access } from "@/lib/utils";

type ContainerProps = JSX.IntrinsicElements["box"] & {
  class?: string | Accessor<string>;
  cssClasses?: string[] | Accessor<string[]>;
};

export default function Container({
  class: classProp = "",
  cssClasses: cssClassesProp,
  ...props
}: ContainerProps) {
  const classNames = createComputed(() => {
    const classes = ["container"];
    const className = access(classProp);
    const cssClasses = access(cssClassesProp);

    if (className) classes.push(...className.split(" "));
    if (cssClasses) classes.push(...cssClasses);

    return classes;
  });

  return <box cssClasses={classNames} {...props} />;
}
