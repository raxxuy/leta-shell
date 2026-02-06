import type { Accessor } from "ags";
import { Cursors } from "@/constants";
import { useGlobalConfig } from "@/hooks/useConfig";

interface PlayerButtonProps {
  iconName: string | Accessor<string>;
  onClicked: () => void;
}

export default function PlayerButton({
  iconName,
  onClicked,
}: PlayerButtonProps) {
  const { iconSize } = useGlobalConfig();

  return (
    <button
      class="rounded-lg p-1 hover:bg-background-light/80 active:bg-background-lighter/80"
      cursor={Cursors.POINTER}
      onClicked={onClicked}
    >
      <image iconName={iconName} pixelSize={iconSize("small", 1.3)} />
    </button>
  );
}
