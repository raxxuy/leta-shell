import { Align } from "@/enums";
import { createReactiveMemo } from "@/lib/reactive";
import type { Reactive } from "@/types/reactive";

interface SwitchFieldProps {
  onCommit: (value: boolean) => void;
  value: Reactive<boolean>;
}

export default function SwitchField({
  onCommit,
  value: valueProp,
}: SwitchFieldProps) {
  const value = createReactiveMemo(valueProp);

  return (
    <switch
      active={value}
      class="min-h-5 min-w-10 rounded-full bg-white/10 p-0.5 transition-colors duration-200 checked:bg-white/15 [&_slider]:rounded-full [&_slider]:bg-white/60 checked:[&_slider]:bg-white"
      focusable={false}
      halign={Align.END}
      hexpand
      onNotifyActive={({ active }) => onCommit(active)}
      valign={Align.CENTER}
    />
  );
}
