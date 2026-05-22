import { type CCProps, onMount } from "ags";
import GObject from "ags/gobject";
import { Astal, type Gtk } from "ags/gtk4";
import { RevealerTransitionType } from "@/enums";
import useClickOutside from "@/hooks/ui/interactions/useClickOutside";
import useEscape from "@/hooks/ui/interactions/useEscape";
import { access, createReactiveMemo } from "@/lib/reactive";
import {
  type Anchor,
  type PositionKey,
  positions,
  resolveAnchor,
} from "@/lib/window";
import type { Reactive } from "@/types/reactive";

/**
 * {@link https://github.com/TheWolfStreet/ags2-shell/blob/main/widget/shared/PopupWindow.tsx}
 *
 * Thank you for this
 */
class PopupImpl extends Astal.Window {
  revealer?: Gtk.Revealer;
  animatedChild?: Gtk.Widget;
  animation?: Reactive<PopupAnimation | undefined>;

  override vfunc_show(): void {
    super.vfunc_show();
    const anim = this.animation ? access(this.animation) : null;
    if (anim) {
      this.animatedChild?.remove_css_class(`animate-${anim}-out`);
      this.animatedChild?.add_css_class(`animate-${anim}-in`);
    }
    this.revealer?.set_reveal_child(true);
  }

  override vfunc_hide(): void {
    const anim = this.animation ? access(this.animation) : null;
    if (anim) {
      this.animatedChild?.remove_css_class(`animate-${anim}-in`);
      this.animatedChild?.add_css_class(`animate-${anim}-out`);
    }
    this.revealer?.set_reveal_child(false);
  }

  hide_super(): void {
    super.vfunc_hide();
    this.notify("visible");
  }
}

type PopupAnimation = "slide-up" | "slide-down" | "scale" | "fade" | "none";

export type PopupWindowProps = Omit<
  CCProps<PopupImpl, Partial<PopupImpl>>,
  "anchor" | "revealer" | "animatedChild"
> & {
  anchor?: Reactive<Anchor>;
  animation?: Reactive<PopupAnimation>;
  clickOutside?: Reactive<boolean>;
  escape?: Reactive<boolean>;
  position?: Reactive<PositionKey>;
  transitionType?: Reactive<Gtk.RevealerTransitionType>;
  transitionDuration?: Reactive<number>;
};

const Popup = GObject.registerClass(PopupImpl);

export default function PopupWindow({
  anchor: anchorProp,
  position = "center",
  transitionType = RevealerTransitionType.CROSSFADE,
  transitionDuration = 200,
  clickOutside: clickOutsideProp = true,
  animation,
  children,
  $,
  ...props
}: PopupWindowProps) {
  const anchor = createReactiveMemo(anchorProp, resolveAnchor);
  const pos = createReactiveMemo(position, (p) => positions[p]);
  const halign = pos((p) => p.halign);
  const valign = pos((p) => p.valign);

  let winRef: PopupImpl;
  let revealerRef: Gtk.Revealer;

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
        <box
          $={(self) => {
            onMount(() => {
              winRef.animatedChild = self;
              winRef.animation = animation;
            });
          }}
        >
          {children}
        </box>
      </revealer>
    </Popup>
  );
}
