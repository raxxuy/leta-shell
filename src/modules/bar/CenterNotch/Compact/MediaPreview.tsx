import { With } from "ags";
import { Gtk } from "ags/gtk4";
import {
  Align,
  EllipsizeMode,
  EventControllerScrollFlags,
  Overflow,
} from "@/enums";
import useMediaPreview, {
  usePreviewLabel,
} from "@/hooks/services/mpris/useMediaPreview";

export default function MediaPreview() {
  const { activePlayer, onScroll } = useMediaPreview();

  return (
    <With value={activePlayer}>
      {(player) => {
        if (!player) return <label hexpand label="No active player" />;

        const previewLabel = usePreviewLabel(player);

        return (
          <box overflow={Overflow.HIDDEN}>
            <Gtk.EventControllerScroll
              flags={EventControllerScrollFlags.VERTICAL}
              onScroll={onScroll}
            />
            <label
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
