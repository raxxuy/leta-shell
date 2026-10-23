import { For, With } from "ags";
import { Gtk } from "ags/gtk4";

import { Align } from "@/enums";
import { createReactiveMemo } from "@/lib/reactive";
import { cleanupWidget, scan } from "@/lib/theme/plugin";
import { useTheme } from "@/providers/ThemeProvider";
import type { Reactive } from "@/types/reactive";

interface SelectFieldProps<T> {
  children: (option: T, selected: boolean) => JSX.Element;
  onCommit: (value: T) => void;
  options: Reactive<T[]>;
  orientation?: Reactive<Gtk.Orientation>;
  value: Reactive<T>;
}

export default function SelectField<T>({
  options: optionsProp,
  orientation: orientationProp = Gtk.Orientation.HORIZONTAL,
  value: valueProp,
  onCommit,
  children,
}: SelectFieldProps<T>) {
  const { spacing } = useTheme();

  const value = createReactiveMemo(valueProp);
  const options = createReactiveMemo(optionsProp);
  const orientation = createReactiveMemo(orientationProp);

  return (
    <box
      class="rounded-lg border border-white/10 bg-white/5 p-1"
      orientation={orientation}
      spacing={spacing.xs}
      valign={Align.CENTER}
    >
      <For cleanup={cleanupWidget} each={options}>
        {(option) => (
          <button
            $={scan}
            class={value(
              (current) =>
                `rounded-md border border-white/5 px-3 py-1.5 ${
                  current === option ? "bg-white/10" : "hover:bg-white/5"
                }`,
            )}
            onClicked={() => onCommit(option)}
            valign={Align.CENTER}
          >
            <With cleanup={cleanupWidget} value={value}>
              {(value) => children(option, value === option)}
            </With>
          </button>
        )}
      </For>
    </box>
  );
}
