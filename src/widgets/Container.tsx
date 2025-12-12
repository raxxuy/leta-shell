import { Accessor, createComputed } from "ags";

type ContainerProps = JSX.IntrinsicElements["box"] & {
  gradient?: boolean | Accessor<boolean>;
  class?: string | Accessor<string>;
  cssClasses?: string[] | Accessor<string[]>;
};

export default function Container({
  gradient = false,
  class: className = "",
  cssClasses,
  ...props
}: ContainerProps) {
  const classNames = createComputed(() => {
    const classes = ["container"];
    const _gradient = gradient instanceof Accessor ? gradient() : gradient;
    const _class = className instanceof Accessor ? className() : className;
    const _cssClasses =
      cssClasses instanceof Accessor ? cssClasses() : cssClasses;

    if (_gradient) classes.push("gradient");
    if (_class) classes.push(..._class.split(" "));
    if (_cssClasses) classes.push(..._cssClasses);

    return classes;
  });

  return <box cssClasses={classNames} {...props} />;
}
