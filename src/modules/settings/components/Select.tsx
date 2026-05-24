import { For } from "ags";
import type { Gtk } from "ags/gtk4";
import MenuButton from "@/components/ui/MenuButton";
import { Align, Orientation } from "@/enums";
import { createReactiveMemo } from "@/lib/reactive";
import { cleanupWidget, scan } from "@/lib/theme";
import type { Reactive } from "@/types/reactive";

interface SelectProps<T extends string> {
  onChange: (v: T) => void;
  options: Reactive<T[] | readonly T[]>;
  value: Reactive<T>;
}

export default function Select<T extends string>({
  onChange,
  options: optionsProp,
  value,
}: SelectProps<T>) {
  const options = createReactiveMemo(optionsProp);

  let popoverRef: Gtk.Popover;

  return (
    <MenuButton class="menubutton-custom" focusable={false}>
      <label class="font-medium text-sm capitalize" label={value} />
      <popover
        $={(self) => (popoverRef = self)}
        halign={Align.START}
        valign={Align.END}
      >
        <box
          class="rounded-lg border border-white/10 bg-zinc-900 p-1.5 shadow-lg"
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
