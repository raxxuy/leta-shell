import { createMemo, createState } from "ags";
import clsx from "clsx/lite";
import { access } from "@/lib/reactive";
import { setup } from "@/lib/theme";
import type { Reactive } from "@/types/reactive";

type PopoverProps = JSX.IntrinsicElements["popover"] & {
  animated?: Reactive<boolean>;
};

export default function Popover({
  animated: animatedProp = false,
  class: classNameProp,
  onNotifyVisible,
  children,
  ...props
}: PopoverProps) {
  const [visible, setVisible] = createState(false);

  const className = createMemo(() => {
    const isAnimated = access(animatedProp);
    const classes = access(classNameProp);

    return clsx(classes, isAnimated && visible() && "animate-bounce-in");
  });

  return (
    <popover
      onNotifyVisible={(self, pspec) => {
        setVisible(self.visible);
        onNotifyVisible?.(self, pspec);
      }}
      {...props}
    >
      <box $={setup} class={className}>
        {children}
      </box>
    </popover>
  );
}
