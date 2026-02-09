import type { Accessor } from "ags";
import { Align } from "@/enums";
import { useGlobalConfig } from "@/hooks/useConfig";
import { formatSeconds } from "@/utils";
import PlayerButton from "./PlayerButton";

interface PlayerButtonsProps {
  playbackIcon: Accessor<string>;
  position: Accessor<number>;
  length: Accessor<number>;
  onPrevious: () => void;
  onPlayPause: () => void;
  onNext: () => void;
}

export default function PlayerButtons({
  playbackIcon,
  position,
  length,
  onPrevious,
  onPlayPause,
  onNext,
}: PlayerButtonsProps) {
  const { spacing } = useGlobalConfig();

  return (
    <box hexpand>
      <label
        class="w-12 text-sm"
        label={position((p) => formatSeconds(p, "%M:%S"))}
        valign={Align.START}
        xalign={0}
      />
      <box
        class="pt-1"
        halign={Align.CENTER}
        hexpand
        spacing={spacing("medium")}
      >
        <PlayerButton iconName="media-skip-backward" onClicked={onPrevious} />
        <PlayerButton iconName={playbackIcon} onClicked={onPlayPause} />
        <PlayerButton iconName="media-skip-forward" onClicked={onNext} />
      </box>
      <label
        class="w-12 text-sm"
        halign={Align.END}
        label={length((l) => formatSeconds(l, "%M:%S"))}
        valign={Align.START}
      />
    </box>
  );
}
