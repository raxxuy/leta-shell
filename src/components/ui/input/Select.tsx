import type { Astal, Gtk } from "ags/gtk4";
import { Align, Keymode, Layer, Orientation } from "@/enums";
import { scan } from "@/lib/theme";
import type { Reactive } from "@/types/reactive";
import PopupWindow from "../PopupWindow";

interface SelectProps {
  onChange: (v: string) => void;
  options: readonly string[];
  value: Reactive<string>;
}

export default function Select({ value, options, onChange }: SelectProps) {
  let buttonRef: Gtk.Button;
  let win: Astal.Window;

  const hide = () => win?.hide();

  const dropdown = (
    <PopupWindow
      $={(self) => {
        win = self;
        scan?.(self);
      }}
      anchor="top-left"
      keymode={Keymode.EXCLUSIVE}
      layer={Layer.OVERLAY}
      position="top"
      visible={false}
    >
      <box
        class="rounded-lg border border-white/10 bg-zinc-900 p-1"
        orientation={Orientation.VERTICAL}
      >
        {options.map((opt) => (
          <button
            class="rounded-md px-3 py-1.5 font-medium text-sm capitalize hover:bg-white/5 active:bg-white/8"
            onClicked={() => {
              onChange(opt);
              hide();
            }}
          >
            <label halign={Align.START} label={opt} />
          </button>
        ))}
      </box>
    </PopupWindow>
  );

  const showDropdown = () => {
    const root = buttonRef.get_root() as Gtk.Window;
    const [, x, y] = buttonRef.translate_coordinates(
      root,
      0,
      buttonRef.get_height(),
    );
    win.set_margin_left(x);
    win.set_margin_top(y);
    win.show();
  };

  return (
    <button
      $={(self) => (buttonRef = self)}
      class="rounded-lg border border-white/10 px-3 py-1.5 font-medium text-sm capitalize hover:bg-white/5"
      onClicked={showDropdown}
    >
      <label label={value} />
    </button>
  );
}
