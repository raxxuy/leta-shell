import { With } from "ags";
import { Gtk } from "ags/gtk4";
import {
  Align,
  EllipsizeMode,
  EventControllerScrollFlags,
  Overflow,
} from "@/enums";
import { useMediaPreview } from "@/hooks/features/media/useMediaPreview";
import { useTrackInfo } from "@/hooks/features/media/useTrackInfo";
import { cleanupWidget } from "@/lib/theme";

export default function MediaPreview() {
  const { activePlayer, onScroll } = useMediaPreview();

  return (
    <With cleanup={cleanupWidget} value={activePlayer}>
      {(player) => {
        if (!player)
          return <label class="font-medium" hexpand label="No active player" />;

        const { previewLabel } = useTrackInfo(player);

        return (
          <box overflow={Overflow.HIDDEN}>
            <Gtk.EventControllerScroll
              flags={EventControllerScrollFlags.VERTICAL}
              onScroll={onScroll}
            />
            <label
              class="font-medium"
              ellipsize={EllipsizeMode.END}
              halign={Align.CENTER}
              hexpand
              label={previewLabel}
              maxWidthChars={22}
              tooltipText={previewLabel}
            />
          </box>
        );
      }}
    </With>
  );
}
