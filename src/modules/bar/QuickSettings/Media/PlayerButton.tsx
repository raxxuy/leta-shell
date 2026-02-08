import type { Accessor } from "ags";
import clsx from "clsx/lite";
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
      class={clsx(
        "rounded-lg p-1 transition",
        "hover:bg-background-light/40 hover:outline-1 hover:-outline-offset-1",
        "active:bg-background-lighter/80",
      )}
      cursor={Cursors.POINTER}
      onClicked={onClicked}
    >
      <image iconName={iconName} pixelSize={iconSize("small", 1.3)} />
    </button>
  );
}
