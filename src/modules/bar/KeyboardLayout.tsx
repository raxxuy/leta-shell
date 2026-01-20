import { createBinding } from "ags";
import { cls } from "@/lib/utils";
import Hyprland from "@/services/hyprland";
import type { Keyboard } from "@/types/hyprland";

export default function KeyboardLayout() {
  const hyprland = Hyprland.get_default();
  const mainKeyboard = createBinding(hyprland, "mainKeyboard");

  const getActiveLayout = (k: Keyboard) => {
    const layouts = k.layout?.split(",") ?? [];
    return layouts[k.active_layout_index]?.toUpperCase() ?? "";
  };

  const getLongestLayout = (k: Keyboard) => {
    const layouts = k.layout?.split(",") ?? [];
    return Math.max(...layouts.map((l) => l.length));
  };

  return (
    <button class="button" onClicked={() => hyprland.changeKeyboardLayout()}>
      <label
        class={mainKeyboard((k) =>
          cls("px-2 font-bold text-sm", `w-${getLongestLayout(k) + 4}`),
        )}
        label={mainKeyboard(getActiveLayout)}
      />
    </button>
  );
}
