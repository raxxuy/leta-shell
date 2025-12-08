type ContainerProps = JSX.IntrinsicElements["box"] & {
  gradient?: boolean;
  class?: string;
};

export default function Container({
  gradient = false,
  class: className = "",
  ...props
}: ContainerProps) {
  const classes = ["container", ...className.split(" ")];
  if (gradient) classes.push("gradient");

  return <box cssClasses={classes} {...props} />;
}
