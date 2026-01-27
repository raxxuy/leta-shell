import Graphene from "gi://Graphene";
import { createEffect, createState } from "ags";
import { type Astal, Gdk, Gtk } from "ags/gtk4";
import Window, { type WindowProps } from "./Window";

type RevealerWindowProps = WindowProps & {
  transitionType: Gtk.RevealerTransitionType;
  transitionDuration?: number;
};

export default function RevealerWindow({
  transitionType,
  transitionDuration = 100,
  children,
  ...props
}: RevealerWindowProps) {
  const [revealed, setRevealed] = createState<boolean>(false);

  let window: Astal.Window;
  let revealer: Gtk.Revealer;

  const windowInit = (self: Astal.Window) => {
    window = self;
  };

  const revealerInit = (self: Gtk.Revealer) => {
    revealer = self;

    createEffect(() => {
      self.child.set_visible(revealed());
    });
  };

  const hide = () => window?.hide();

  const handleVisible = ({ visible }: { visible: boolean }) => {
    setRevealed(visible);
  };

  const handleKeyPress = (_: unknown, keyval: number) => {
    if (keyval === Gdk.KEY_Escape) hide();
  };

  const handleClickOutside = (
    _: unknown,
    __: unknown,
    x: number,
    y: number,
  ) => {
    if (!revealer || !window) return;

    const [, rect] = revealer.compute_bounds(window);
    const position = new Graphene.Point({ x, y });

    if (!rect.contains_point(position)) hide();
  };

  return (
    <Window
      $={windowInit}
      onNotifyVisible={handleVisible}
      visible={false}
      {...props}
    >
      <Gtk.EventControllerKey onKeyPressed={handleKeyPress} />
      <Gtk.GestureClick onPressed={handleClickOutside} />
      <revealer
        $={revealerInit}
        revealChild={revealed}
        transitionDuration={transitionDuration}
        transitionType={transitionType}
      >
        {children}
      </revealer>
    </Window>
  );
}
