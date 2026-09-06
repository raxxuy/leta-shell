import { onMount } from "ags";
import type { Astal, Gtk } from "ags/gtk4";
import type { Timer } from "ags/time";
import { timeout } from "ags/time";

import { Align } from "@/enums";
import { useClickOutside } from "@/hooks/interactions/useClickOutside";
import { useEscape } from "@/hooks/interactions/useEscape";
import { createReactiveMemo } from "@/lib/reactive";
import type { AnimationKey } from "@/lib/window/animations";
import { animations } from "@/lib/window/animations";
import type { Reactive } from "@/types/reactive";
import type { WindowProps } from "./Window";
import Window from "./Window";

interface PopupProps extends WindowProps {
  animation?: Reactive<AnimationKey>;
  clickOutside?: Reactive<boolean>;
  duration?: Reactive<number>;
  escape?: Reactive<boolean>;
}

export default function Popup({
  animation: animationProp = "none",
  clickOutside: clickOutsideProp = true,
  duration: durationProp = 100,
  escape: escapeProp = true,
  children,
  ...props
}: PopupProps) {
  let windowRef: Astal.Window;
  let targetRef: Gtk.Widget;
  let timer: Timer;

  const animation = createReactiveMemo(animationProp, (key) => animations[key]);
  const duration = createReactiveMemo(durationProp);
  const hasClickOutside = createReactiveMemo(clickOutsideProp);
  const hasEscape = createReactiveMemo(escapeProp);

  const onShow = () => {
    const anim = animation.peek();
    targetRef.remove_css_class(`animate-${anim.exit}`);
    targetRef.add_css_class(`animate-${anim.enter}`);
  };

  const close = () => {
    const anim = animation.peek();
    targetRef.remove_css_class(`animate-${anim.enter}`);
    targetRef.add_css_class(`animate-${anim.exit}`);

    if (timer) timer.cancel();
    timer = timeout(duration.peek(), () => (windowRef.visible = false));
  };

  onMount(() => {
    if (hasEscape.peek()) useEscape(windowRef, close);

    if (hasClickOutside.peek()) {
      useClickOutside(windowRef, { target: targetRef, onClickOutside: close });
    }
  });

  return (
    <Window
      $={(ref) => {
        windowRef = ref;
        windowRef.hide = close;
      }}
      onShow={onShow}
      {...props}
    >
      <box
        $={(ref) => (targetRef = ref)}
        halign={Align.CENTER}
        valign={Align.CENTER}
      >
        {children}
      </box>
    </Window>
  );
}
