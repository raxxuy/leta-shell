import { type CCProps, onMount } from "ags";
import GObject from "ags/gobject";
import { Astal, Gtk } from "ags/gtk4";
import { RevealerTransitionType } from "@/enums";
import { useClickOutside } from "@/hooks/ui/useClickOutside";
import { useEscape } from "@/hooks/ui/useEscape";
import { createReactiveMemo } from "@/lib/reactive";
import { resolveAnchor } from "@/lib/window";
import type { Reactive } from "@/types/reactive";
import type { Anchor } from "@/types/window";

/**
 * {@link https://github.com/TheWolfStreet/ags2-shell/blob/main/widget/shared/PopupWindow.tsx}
 *
 * Thank you for this
 */
class PopupImpl extends Astal.Window {
  revealer?: Gtk.Revealer;

  override vfunc_show(): void {
    super.vfunc_show();
    this.revealer?.set_reveal_child(true);
  }

  override vfunc_hide(): void {
    this.revealer?.set_reveal_child(false);
  }

  hide_super(): void {
    super.vfunc_hide();
    this.notify("visible");
  }
}

type PopupWindowProps = Omit<
  CCProps<PopupImpl, Partial<PopupImpl>>,
  "anchor" | "position"
> & {
  anchor?: Reactive<Anchor>;
  position?: Reactive<"center" | "top" | "bottom">;
  transitionType?: Reactive<Gtk.RevealerTransitionType>;
  transitionDuration?: Reactive<number>;
};

const Popup = GObject.registerClass(PopupImpl);

const positions = {
  center: {
    halign: Gtk.Align.CENTER,
    valign: Gtk.Align.CENTER,
  },
  top: {
    halign: Gtk.Align.CENTER,
    valign: Gtk.Align.START,
  },
  bottom: {
    halign: Gtk.Align.CENTER,
    valign: Gtk.Align.END,
  },
} as const;

export default function PopupWindow({
  anchor: anchorProp,
  position = "center",
  transitionType = RevealerTransitionType.CROSSFADE,
  transitionDuration = 200,
  children,
  $,
  ...props
}: PopupWindowProps) {
  const anchor = createReactiveMemo(anchorProp, resolveAnchor);

  let winRef: PopupImpl;
  let revealerRef: Gtk.Revealer;

  const pos = createReactiveMemo(position, (p) => positions[p]);
  const halign = pos((p) => p.halign);
  const valign = pos((p) => p.valign);

  const bindControllers = () => {
    useEscape(winRef, () => winRef.hide());
    useClickOutside(winRef, revealerRef, () => winRef.hide());
  };

  return (
    <Popup
      $={(self) => {
        winRef = self;
        $?.(self);
      }}
      anchor={anchor}
      {...props}
    >
      <revealer
        $={(self) => {
          onMount(() => {
            revealerRef = self;
            winRef.revealer = self;
            bindControllers();
          });
        }}
        halign={halign}
        onNotifyChildRevealed={(self) => {
          if (!self.get_child_revealed()) winRef.hide_super();
        }}
        transitionDuration={transitionDuration}
        transitionType={transitionType}
        valign={valign}
      >
        {children}
      </revealer>
    </Popup>
  );
}
