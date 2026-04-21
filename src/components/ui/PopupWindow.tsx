import { createState } from "ags";
import { type Astal, Gtk } from "ags/gtk4";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useEscape } from "@/hooks/useEscape";
import { createReactiveMemo } from "@/lib/reactive";
import type { Reactive } from "@/types/reactive";
import type { Anchor } from "@/types/window";
import Window from "./Window";

type PopupWindowProps = Omit<JSX.IntrinsicElements["window"], "anchor"> & {
  anchor?: Reactive<Anchor>;
  position?: Reactive<"center" | "top" | "bottom">;
};

const positions = {
  center: {
    halign: Gtk.Align.CENTER,
    valign: Gtk.Align.CENTER,
    transition: Gtk.RevealerTransitionType.CROSSFADE,
  },
  top: {
    halign: Gtk.Align.CENTER,
    valign: Gtk.Align.START,
    transition: Gtk.RevealerTransitionType.SLIDE_DOWN,
  },
  bottom: {
    halign: Gtk.Align.CENTER,
    valign: Gtk.Align.END,
    transition: Gtk.RevealerTransitionType.SLIDE_UP,
  },
} as const;

export default function PopupWindow({
  position = "center",
  children,
  ...props
}: PopupWindowProps) {
  let winRef: Astal.Window;
  let revealerRef: Gtk.Revealer;

  const [open, setOpen] = createState(false);
  let bound = false;

  const pos = createReactiveMemo(position, (p) => positions[p]);
  const halign = pos((p) => p.halign);
  const valign = pos((p) => p.valign);
  const transition = pos((p) => p.transition);

  const bindControllers = () => {
    if (!winRef || !revealerRef) return;
    if (bound) return;

    bound = true;

    useEscape(winRef, () => setOpen(false));
    useClickOutside(winRef, revealerRef, () => setOpen(false));
  };

  return (
    <Window
      $={(w) => {
        winRef = w;
        bindControllers();
      }}
      visible={open}
      {...props}
    >
      <revealer
        $={(r) => {
          revealerRef = r;
          bindControllers();
        }}
        revealChild={open}
        transitionType={transition}
      >
        <box halign={halign} valign={valign}>
          {children}
        </box>
      </revealer>
    </Window>
  );
}
