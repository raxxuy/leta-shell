import { createBinding, createComputed, With } from "ags";
import { Gtk } from "ags/gtk4";
import {
  Align,
  EllipsizeMode,
  EventControllerScrollFlags,
  Overflow,
} from "@/enums";
import { useActivePlayer } from "@/hooks/services/mpris/useActivePlayer";
import { useScrollLock } from "@/hooks/ui/useScrollLock";
import MprisService from "@/services/mpris";

export default function MediaPreview() {
  const activePlayer = useActivePlayer();
  const handleScroll = useScrollLock(200);
  const mprisService = MprisService.get_default();

  const onPlayerChanged = (_: unknown, __: unknown, dy: number) => {
    if (mprisService.players.length < 2) return;

    handleScroll(dy, (dir) => {
      if (dir > 0) mprisService.next();
      else mprisService.previous();
    });
  };

  return (
    <With value={activePlayer}>
      {(player) => {
        const title = createBinding(player, "title");
        const artist = createBinding(player, "artist");

        const previewLabel = createComputed(() => `${title()} - ${artist()}`);

        return player ? (
          <box overflow={Overflow.HIDDEN}>
            <Gtk.EventControllerScroll
              flags={EventControllerScrollFlags.VERTICAL}
              onScroll={onPlayerChanged}
            />
            <label
              ellipsize={EllipsizeMode.END}
              halign={Align.CENTER}
              hexpand
              label={previewLabel}
              maxWidthChars={22}
            />
          </box>
        ) : (
          <label hexpand label="No active player" />
        );
      }}
    </With>
  );
}
