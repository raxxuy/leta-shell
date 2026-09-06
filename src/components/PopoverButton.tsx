import { onCleanup } from "ags";
import { Gtk } from "ags/gtk4";

import { StateFlags } from "@/enums";
import { useClick } from "@/hooks/interactions/useClick";
import { findWidget } from "@/lib/gtk/widget";
import { createReactiveMemo } from "@/lib/reactive";
import type { Reactive } from "@/types/reactive";

type PopoverButtonProps = JSX.IntrinsicElements["button"] & {
  disabled?: Reactive<boolean>;
};

export const PopoverButton = ({
  disabled: disabledProp,
  children,
  ...props
}: PopoverButtonProps) => {
  const disabled = createReactiveMemo(disabledProp);

  const init = (self: Gtk.Button) => {
    const popover = findWidget<Gtk.Popover>(
      self,
      (widget) => widget instanceof Gtk.Popover,
      "bfs",
    );

    if (!popover) return null;

    useClick(self, {
      onRelease: () => {
        if (disabled.peek()) return;
        if (popover.visible) popover.popdown();
        else popover.popup();
      },
    });

    const handler = popover.connect("closed", () => {
      self.unset_state_flags(StateFlags.SELECTED);
    });

    onCleanup(() => popover.disconnect(handler));
  };

  return (
    <button $={init} {...props}>
      <box>{children}</box>
    </button>
  );
};
