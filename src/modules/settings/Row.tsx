import { Align } from "@/enums";
import type { Reactive } from "@/types/reactive";

interface SettingRowProps {
  children: JSX.Element;
  label: Reactive<string>;
}

export function SettingRow({ label, children }: SettingRowProps) {
  return (
    <box valign={Align.CENTER}>
      <label
        class="font-medium text-sm opacity-70"
        halign={Align.START}
        hexpand
        label={label}
      />
      {children}
    </box>
  );
}
