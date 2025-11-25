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

  const hide = () => window.get()?.hide();

  const handleNotifyVisible = (self: Gtk.Widget) => {
    const isVisible = self.visible;
    setRevealed(isVisible);

    if (isVisible) {
      entry.get()?.grab_focus();
    } else {
      entry.get()?.set_text("");
    }
  };

  const handleKeyPress = (_: unknown, keyval: number) => {
    if (keyval === Gdk.KEY_Escape) hide();
  };

  const handleClickOutside = (
    _e: unknown,
    _w: unknown,
    x: number,
    y: number,
  ) => {
    const revealerWidget = revealer.get();
    const windowWidget = window.get();

    if (!revealerWidget || !windowWidget) return;

    const [, rect] = revealerWidget.compute_bounds(windowWidget);
    const position = new Graphene.Point({ x, y });

    if (!rect.contains_point(position)) {
      hide();
    }
  };

  return (
    <Window
      $={setWindow}
      visible={false}
      name="launcher"
      class="launcher"
      application={app}
      anchor="bottom-full"
      layer={Layer.OVERLAY}
      keymode={Keymode.EXCLUSIVE}
      exclusivity={Exclusivity.IGNORE}
      onNotifyVisible={handleNotifyVisible}
    >
      <Gtk.EventControllerKey onKeyPressed={handleKeyPress} />
      <Gtk.GestureClick onPressed={handleClickOutside} />
      <revealer
        vexpand
        $={setRevealer}
        halign={Align.CENTER}
        valign={Align.CENTER}
        revealChild={revealed}
        transitionDuration={100}
        transitionType={RevealerTransitionType.SLIDE_UP}
      >
        <LauncherModule setEntry={setEntry} />
      </revealer>
    </Window>
  );
}
