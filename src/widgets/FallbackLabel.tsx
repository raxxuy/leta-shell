import { Accessor, createState, onCleanup } from "ags";

type FallbackLabelProps = JSX.IntrinsicElements["label"] & {
  source: unknown | Accessor<unknown>;
  label: string;
  fallback: string;
};

export default function FallbackLabel({
  source,
  label,
  fallback,
  ...props
}: FallbackLabelProps) {
  const [value, setValue] = createState<string>("");

  if (source instanceof Accessor) {
    const setLabel = () =>
      source.get() ? setValue(label) : setValue(fallback);
    const dispose = source.subscribe(setLabel);
    onCleanup(() => dispose());
    setLabel();
  } else {
    setValue(source ? label : fallback);
  }

  return <label {...props} label={value} />;
}
