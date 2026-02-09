import type { Accessor } from "ags";
import { Align, EllipsizeMode, Orientation } from "@/enums";

interface PlayerInfoProps {
  title: Accessor<string>;
  artist: Accessor<string>;
}

export default function PlayerInfo({ title, artist }: PlayerInfoProps) {
  return (
    <box orientation={Orientation.VERTICAL}>
      <label
        class="font-bold text-md"
        ellipsize={EllipsizeMode.END}
        halign={Align.START}
        label={title}
        maxWidthChars={24}
      />
      <label
        class="text-on-surface-dark text-sm"
        halign={Align.START}
        label={artist}
      />
    </box>
  );
}
