import { type CCProps, onMount } from "ags";
import GObject from "ags/gobject";
import { Astal, type Gtk } from "ags/gtk4";
import { RevealerTransitionType } from "@/enums";
import { useClickOutside } from "@/hooks/ui/useClickOutside";
import { useEscape } from "@/hooks/ui/useEscape";
import { access, createReactiveMemo } from "@/lib/reactive";
import { positions, resolveAnchor } from "@/lib/window";
import type { Reactive } from "@/types/reactive";
import type { Anchor, PositionKey } from "@/types/window";

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
  "anchor"
> & {
  anchor?: Reactive<Anchor>;
  position?: Reactive<PositionKey>;
  transitionType?: Reactive<Gtk.RevealerTransitionType>;
  transitionDuration?: Reactive<number>;
  clickOutside?: Reactive<boolean>;
  escape?: Reactive<boolean>;
};

const Popup = GObject.registerClass(PopupImpl);

export default function PopupWindow({
  anchor: anchorProp,
  position = "center",
  transitionType = RevealerTransitionType.CROSSFADE,
  transitionDuration = 200,
  clickOutside: clickOutsideProp = true,
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
    const clickOutside = access(clickOutsideProp);

    useEscape(winRef, () => winRef.hide());
    if (clickOutside) useClickOutside(winRef, revealerRef, () => winRef.hide());
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
