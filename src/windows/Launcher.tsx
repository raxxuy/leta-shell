import Graphene from "gi://Graphene";
import { createState } from "ags";
import { Gdk, Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import {
  Align,
  Exclusivity,
  Keymode,
  Layer,
  RevealerTransitionType,
} from "@/enums";
import LauncherModule from "@/modules/launcher";
import Window from "@/widgets/Window";

export default function Launcher() {
  const [revealed, setRevealed] = createState<boolean>(false);
  const [entry, setEntry] = createState<Gtk.Entry | null>(null);
  const [window, setWindow] = createState<Gtk.Window | null>(null);
  const [revealer, setRevealer] = createState<Gtk.Revealer | null>(null);

  const handleNotifyVisible = (self: Gtk.Widget) => {
    setRevealed(self.visible);
    if (self.visible) entry.get()?.grab_focus();
    else entry.get()?.set_text("");
  };

  return (
    <Window
      $={setWindow}
      visible={false}
      anchor="bottom-full"
      name="launcher"
      class="launcher"
      application={app}
      layer={Layer.OVERLAY}
      keymode={Keymode.EXCLUSIVE}
      exclusivity={Exclusivity.IGNORE}
      onNotifyVisible={handleNotifyVisible}
    >
      <Gtk.EventControllerKey
        onKeyPressed={(_, keyval) => {
          if (keyval === Gdk.KEY_Escape) {
            window.get()?.hide();
          }
        }}
      />
      <Gtk.GestureClick
        onPressed={(_e, _w, x, y) => {
          const _revealer = revealer.get();
          if (_revealer) {
            const [, rect] = _revealer.compute_bounds(
              window.get() as Gtk.Window,
            );
            const position = new Graphene.Point({ x, y });

            if (!rect.contains_point(position)) {
              window.get()?.hide();
              return true;
            }
          }
        }}
      />
      <revealer
        vexpand
        $={setRevealer}
        halign={Align.CENTER}
        valign={Align.CENTER}
        revealChild={revealed}
        transitionDuration={200}
        transitionType={RevealerTransitionType.SLIDE_UP}
      >
        <LauncherModule setEntry={setEntry} />
      </revealer>
    </Window>
  );
}
