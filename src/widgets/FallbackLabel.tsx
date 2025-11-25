import { Accessor } from "ags";

type FallbackLabelProps = JSX.IntrinsicElements["label"] & {
  source: unknown | Accessor<unknown>;
  label: string | Accessor<string>;
  fallback: string | Accessor<string>;
};

export default function FallbackLabel({
  source,
  label,
  fallback,
  ...props
}: FallbackLabelProps) {
  const value: string | Accessor<string> =
    source instanceof Accessor
      ? source((s) => (s ? label : fallback)).get()
      : source
        ? label
        : fallback;

  return <label {...props} label={value} />;
}
