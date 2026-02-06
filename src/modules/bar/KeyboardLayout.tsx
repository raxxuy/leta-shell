import { Button } from "@/components/button";
import { useHyprland } from "@/hooks/useHyprland";
import type { Keyboard } from "@/types/hyprland";

export default function KeyboardLayout() {
  const { mainKeyboard, changeKeyboardLayout } = useHyprland();

  const classNames = mainKeyboard(
    (k) => `px-2 font-bold text-sm w-${getLongestLayout(k) + 4}`,
  );

  const getActiveLayout = (k: Keyboard) => {
    const layouts = k.layout.split(",");
    return layouts[k.active_layout_index].toUpperCase();
  };

  const getLongestLayout = (k: Keyboard) => {
    const layouts = k.layout.split(",");
    return Math.max(...layouts.map((l) => l.length));
  };

  const handleClick = () => changeKeyboardLayout();

  return (
    <Button onClicked={handleClick}>
      <label class={classNames} label={mainKeyboard(getActiveLayout)} />
    </Button>
  );
}
