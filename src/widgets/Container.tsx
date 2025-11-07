type ContainerProps = JSX.IntrinsicElements["box"] & {
  gradient?: boolean;
};

export default function Container({
  gradient = false,
  ...props
}: ContainerProps) {
  const classes = ["container"];
  if (gradient) classes.push("gradient");

  return <box cssClasses={classes} {...props} />;
}
