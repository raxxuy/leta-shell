import { Accessor, createEffect, createState } from "ags";

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
    const setLabel = () => (source() ? setValue(label) : setValue(fallback));
    createEffect(setLabel);
  } else {
    setValue(source ? label : fallback);
  }

  return <label {...props} label={value} />;
}
