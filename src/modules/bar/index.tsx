import useSpacing from "@/hooks/services/useSpacing";
import useBarProps from "@/hooks/ui/windows/useBarProps";
import { widgetRegistry } from "./registry";

export default function BarModule() {
  const spacing = useSpacing();
  const { layout, containerClassName } = useBarProps();

  return (
    <centerbox class="mb-0.5 px-4">
      <box $type="start" class={containerClassName} spacing={spacing.xl}>
        {layout.peek().left.map((name) => widgetRegistry[name]?.())}
      </box>
      <box $type="center">
        {layout.peek().center.map((name) => widgetRegistry[name]?.())}
      </box>
      <box $type="end" class={containerClassName} spacing={spacing.xl}>
        {layout.peek().right.map((name) => widgetRegistry[name]?.())}
      </box>
    </centerbox>
  );
}
