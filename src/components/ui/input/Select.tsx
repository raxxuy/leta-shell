import { For } from "ags";
import type { Gtk } from "ags/gtk4";
import { Align, Orientation } from "@/enums";
import { createReactiveMemo } from "@/lib/reactive";
import { cleanupWidget, scan } from "@/lib/theme";
import type { Reactive } from "@/types/reactive";
import MenuButton from "../MenuButton";

interface SelectProps {
  onChange: (v: string) => void;
  options: Reactive<string[] | readonly string[]>;
  value: Reactive<string>;
}

export default function Select({
  value,
  options: optionsProp,
  onChange,
}: SelectProps) {
  const options = createReactiveMemo(optionsProp);

  let popoverRef: Gtk.Popover;

  return (
    <MenuButton class="rounded-lg border border-white/10 transition-colors checked:bg-white/8 hover:bg-white/5 active:bg-white/8 [&>button]:px-3 [&>button]:py-1.5">
      <label class="font-medium text-sm capitalize" label={value} />
      <popover
        $={(self) => (popoverRef = self)}
        halign={Align.START}
        valign={Align.END}
      >
        <box
          class="rounded-lg border border-white/10 bg-zinc-900 p-1.5"
          orientation={Orientation.VERTICAL}
        >
          <For cleanup={cleanupWidget} each={options}>
            {(option) => (
              <button
                $={scan}
                class="rounded-md px-3 py-1.5 hover:bg-white/5 active:bg-white/8"
                focusable={false}
                onClicked={() => {
                  onChange(option);
                  popoverRef.popdown();
                }}
              >
                <label
                  class="font-medium text-sm capitalize"
                  halign={Align.START}
                  label={option}
                />
              </button>
            )}
          </For>
        </box>
      </popover>
    </MenuButton>
  );
}
