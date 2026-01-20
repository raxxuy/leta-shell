import type { Accessor } from "ags";
import { CURSORS } from "@/constants";
import ConfigManager from "@/services/configs";

interface PlayerButtonProps {
  iconName: string | Accessor<string>;
  onClicked: () => void;
}

export default function PlayerButton({
  iconName,
  onClicked,
}: PlayerButtonProps) {
  const configManager = ConfigManager.get_default();
  const icons = configManager.bind("global", "icons");

  return (
    <button
      class="rounded-lg p-1 hover:bg-background-light/80 active:bg-background-lighter/80"
      cursor={CURSORS.pointer}
      onClicked={onClicked}
    >
      <image
        iconName={iconName}
        pixelSize={icons((i) => i.pixelSize.small * 1.3)}
      />
    </button>
  );
}
