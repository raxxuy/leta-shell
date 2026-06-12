import type { Gtk } from "ags/gtk4";
import { Align } from "@/enums";
import { createReactiveMemo } from "@/lib/reactive";
import type { Reactive } from "@/types/reactive";
import ContextMenu from "./ContextMenu";
import MenuButton from "./MenuButton";

interface SelectProps<T extends string> {
  onChange: (value: T) => void;
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
        <ContextMenu
          items={options((opts) =>
            opts.map((option) => ({
              label: option,
              onClick: () => {
                onChange(option);
                popoverRef.popdown();
              },
            })),
          )}
        />
      </popover>
    </MenuButton>
  );
}
