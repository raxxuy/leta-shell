import { createBinding } from "ags";
import Button from "@/components/button/Button";
import Hyprland from "@/services/hyprland";
import type { Keyboard } from "@/types/hyprland";

export default function KeyboardLayout() {
  const hyprland = Hyprland.get_default();
  const mainKeyboard = createBinding(hyprland, "mainKeyboard");

  const classNames = mainKeyboard(
    (k) => `px-2 font-bold text-sm w-${getLongestLayout(k) + 4}`,
  );

  const getActiveLayout = (k: Keyboard) => {
    const layouts = k.layout?.split(",") ?? [];
    return layouts[k.active_layout_index]?.toUpperCase() ?? "";
  };

  const getLongestLayout = (k: Keyboard) => {
    const layouts = k.layout?.split(",") ?? [];
    return Math.max(...layouts.map((l) => l.length));
  };

  const handleClick = () => hyprland.changeKeyboardLayout();

  return (
    <Button onClicked={handleClick}>
      <label class={classNames} label={mainKeyboard(getActiveLayout)} />
    </Button>
  );
}
