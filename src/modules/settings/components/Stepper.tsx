import useSpacing from "@/hooks/services/useSpacing";
import { access, createReactiveMemo } from "@/lib/reactive";
import type { Reactive } from "@/types/reactive";

interface StepperProps {
  max: Reactive<number>;
  min: Reactive<number>;
  onChange: (v: number) => void;
  value: Reactive<number>;
}

const StepButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <button
    class="rounded-lg px-2 py-1 font-mono hover:bg-white/5 active:bg-white/8"
    onClicked={onClick}
  >
    <label label={label} />
  </button>
);

export default function Stepper({ value, min, max, onChange }: StepperProps) {
  const spacing = useSpacing();
  const label = createReactiveMemo(value, String);

  return (
    <box spacing={spacing.xs}>
      <StepButton
        label="-"
        onClick={() => onChange(Math.max(access(min), access(value) - 1))}
      />
      <label class="min-w-6 text-center font-semibold text-sm" label={label} />
      <StepButton
        label="+"
        onClick={() => onChange(Math.min(access(max), access(value) + 1))}
      />
    </box>
  );
}
