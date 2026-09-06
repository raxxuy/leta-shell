import { With } from "ags";

import { Align, Orientation } from "@/enums";
import { cleanupWidget } from "@/lib/theme/plugin";
import { useTheme } from "@/providers/ThemeProvider";
import { useMpris } from "../useMpris";
import AudioVisualizer from "./AudioVisualizer";
import CoverArt from "./CoverArt";
import Track from "./Track";

export default function MediaPlayerExpanded() {
  const { active } = useMpris();
  const { spacing } = useTheme();

  return (
    <box spacing={spacing.md}>
      <box class="min-h-26 min-w-26" halign={Align.START} valign={Align.CENTER}>
        <With cleanup={cleanupWidget} value={active}>
          {(player) => <CoverArt player={player} />}
        </With>
      </box>

      <box
        class="min-w-92"
        halign={Align.CENTER}
        orientation={Orientation.VERTICAL}
        spacing={spacing.lg}
        valign={Align.CENTER}
      >
        <With cleanup={cleanupWidget} value={active}>
          {(player) => <Track player={player} />}
        </With>
      </box>

      <box class="min-w-26" halign={Align.END} valign={Align.END}>
        <With cleanup={cleanupWidget} value={active}>
          {(player) => <AudioVisualizer player={player} />}
        </With>
      </box>
    </box>
  );
}
