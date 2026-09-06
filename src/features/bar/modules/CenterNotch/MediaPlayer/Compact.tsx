import { createComputed, With } from "ags";

import { Align, EllipsizeMode } from "@/enums";
import { createBindings } from "@/lib/binding";
import { cleanupWidget } from "@/lib/theme/plugin";
import { useMpris } from "./useMpris";

export default function MediaPlayerCompact() {
  const { active } = useMpris();

  return (
    <box class="font-medium text-shadow-xs" halign={Align.CENTER} hexpand>
      <With cleanup={cleanupWidget} value={active}>
        {(player) => {
          if (!player) return <label label="No current player" />;

          const { title, artist } = createBindings(player, {
            title: true,
            artist: true,
          });

          const trackLabel = createComputed(() => `${title()} - ${artist()}`);

          return (
            <label
              ellipsize={EllipsizeMode.END}
              halign={Align.CENTER}
              hexpand
              label={trackLabel}
              maxWidthChars={22}
              tooltipText={trackLabel}
            />
          );
        }}
      </With>
    </box>
  );
}
