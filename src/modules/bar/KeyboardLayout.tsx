import { createBinding } from "ags";
import { Button } from "@/components/button";
import HyprlandService from "@/services/hyprland";
import type { Keyboard } from "@/services/hyprland/types";

export default function KeyboardLayout() {
  const hyprlandService = HyprlandService.get_default();
  const mainKeyboard = createBinding(hyprlandService, "mainKeyboard");

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

  const handleClick = () => hyprlandService.changeKeyboardLayout();

  return (
    <Button onClicked={handleClick}>
      <label class={classNames} label={mainKeyboard(getActiveLayout)} />
    </Button>
  );
}
