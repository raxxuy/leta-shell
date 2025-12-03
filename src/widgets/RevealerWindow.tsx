import Graphene from "gi://Graphene";
import { createEffect, createState } from "ags";
import { type Astal, Gdk, Gtk } from "ags/gtk4";
import Window, { type WindowProps } from "@/widgets/Window";

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

    if (!rect.contains_point(position)) {
      hide();
    }
  };

  return (
    <Window
      $={(self) => {
        window = self;
      }}
      visible={false}
      onNotifyVisible={handleVisible}
      {...props}
    >
      <Gtk.EventControllerKey onKeyPressed={handleKeyPress} />
      <Gtk.GestureClick onPressed={handleClickOutside} />
      <revealer
        $={(self) => {
          revealer = self;

          createEffect(() => {
            self.child.set_visible(revealed());
          });
        }}
        revealChild={revealed}
        transitionDuration={transitionDuration}
        transitionType={transitionType}
      >
        {children}
      </revealer>
    </Window>
  );
}
