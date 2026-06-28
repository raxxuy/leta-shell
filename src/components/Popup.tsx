import GLib from "gi://GLib";
import type { Gtk } from "ags/gtk4";
import { useClickOutside } from "@/hooks/interactions/useClickOutside";
import { useEscape } from "@/hooks/interactions/useEscape";
import { access, createReactiveMemo } from "@/lib/reactive";
import { scan } from "@/lib/theme";
import {
  type Anchor,
  animations,
  type PositionKey,
  positions,
  resolveAnchor,
  type WindowWithClose,
} from "@/lib/window";
import type { AnimationKey } from "@/lib/window/animations";
import type { Reactive } from "@/types/reactive";
import type { WindowProps } from "./Window";

type PopupProps = Omit<WindowProps, "anchor"> & {
  anchor?: Reactive<Anchor>;
  animation?: Reactive<AnimationKey>;
  animationDuration?: Reactive<number>;
  clickOutside?: Reactive<boolean>;
  escape?: Reactive<boolean>;
  position?: Reactive<PositionKey>;
};

export default function Popup({
  anchor: anchorProp,
  animation: animationProp,
  animationDuration: animationDurationProp = 100,
  clickOutside: clickOutsideProp = true,
  escape: escapeProp = true,
  position: positionProp = "center",
  children,
  ...props
}: PopupProps) {
  const anchor = createReactiveMemo(anchorProp, resolveAnchor);
  const animation = createReactiveMemo(
    animationProp,
    (key) => animations[key ?? "none"],
  );
  const animationDuration = createReactiveMemo(
    animationDurationProp,
    (duration) => duration,
  );
  const position = createReactiveMemo(positionProp, (pos) => positions[pos]);
  const halign = position((p) => p.halign);
  const valign = position((p) => p.valign);

  let winRef: Gtk.Window;
  let targetRef: Gtk.Widget;

  const close = () => {
    const anim = animation.peek();
    targetRef.remove_css_class(`animate-${anim.enter}`);
    targetRef.add_css_class(`animate-${anim.exit}`);

    GLib.timeout_add(GLib.PRIORITY_DEFAULT, animationDuration.peek(), () => {
      winRef.visible = false;
      return GLib.SOURCE_REMOVE;
    });
  };

  const onShow = () => {
    const anim = animation.peek();
    targetRef.remove_css_class(`animate-${anim.exit}`);
    targetRef.add_css_class(`animate-${anim.enter}`);
  };

  const bindControllers = () => {
    if (access(escapeProp)) useEscape(winRef, close);
    if (access(clickOutsideProp))
      useClickOutside(winRef, { target: targetRef, onClickOutside: close });
  };

  return (
    <window
      $={(self) => {
        winRef = self;
        (self as unknown as WindowWithClose).requestClose = close;
        self.connect("notify::visible", () => {
          if (self.visible) onShow();
        });
        bindControllers();
        scan?.(self);
      }}
      anchor={anchor}
      {...props}
    >
      <box $={(self) => (targetRef = self)} halign={halign} valign={valign}>
        {children}
      </box>
    </window>
  );
}
