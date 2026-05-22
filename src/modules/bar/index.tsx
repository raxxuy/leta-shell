import useSpacing from "@/hooks/services/useSpacing";
import useBarProps from "@/hooks/ui/windows/useBarProps";
import { widgetRegistry } from "./registry";

export default function BarModule() {
  const spacing = useSpacing();
  const { layout, containerClassName } = useBarProps();

  const left = layout.peek().left;
  const center = layout.peek().center;
  const right = layout.peek().right;

  return (
    <centerbox class="mb-0.5 px-4">
      <box $type="start" class={containerClassName} spacing={spacing.xl}>
        {left.map((name) => widgetRegistry[name]())}
      </box>
      <box $type="center">{center.map((name) => widgetRegistry[name]())}</box>
      <box $type="end" class={containerClassName} spacing={spacing.xl}>
        {right.map((name) => widgetRegistry[name]())}
      </box>
    </centerbox>
  );
}
