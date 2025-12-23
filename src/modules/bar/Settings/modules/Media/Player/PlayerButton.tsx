import type { Accessor } from "ags";
import { CURSORS } from "@/constants";
import { getConfig } from "@/lib/config";

const { icons } = getConfig("global");

interface PlayerButtonProps {
  iconName: string | Accessor<string>;
  onClicked: () => void;
}

export default function PlayerButton({
  iconName,
  onClicked,
}: PlayerButtonProps) {
  return (
    <button
      class="rounded-lg p-1 hover:bg-background-light/80 active:bg-background-lighter/80"
      onClicked={onClicked}
      cursor={CURSORS.pointer}
    >
      <image iconName={iconName} pixelSize={icons.pixelSize.small * 1.2} />
    </button>
  );
}
