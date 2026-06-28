import type { Gtk } from "ags/gtk4";
import { Cursor } from "@/constants";
import { useCenterNotch } from "@/hooks/features/center-notch/useCenterNotch";
import { useMouseHover } from "@/hooks/interactions/useMouseHover";
import CenterNotchProvider from "@/providers/CenterNotchProvider";
import Compact from "./Compact";
import Expanded from "./Expanded";

const CenterNotchInner = () => {
  const { setOpen, hovered, setHovered, cycle, className } = useCenterNotch();

  const init = (self: Gtk.Box) => {
    useMouseHover(self, {
      onEnter: () => setHovered(true),
      onLeave: () => setHovered(false),
    });
  };

  return (
    <box $={init} class={className}>
      <button
        class="mr-2"
        iconName="chevron-left"
        onClicked={() => cycle("prev")}
        visible={hovered}
      />
      <menubutton cursor={Cursor.POINTER}>
        <Compact />
        <popover
          class="m-[5px_10px_15px] rounded-2xl bg-zinc-950/95 p-4 shadow-md"
          hasArrow={false}
          onNotifyVisible={(self) => setOpen(self.visible)}
        >
          <Expanded />
        </popover>
      </menubutton>
      <button
        class="ml-2"
        iconName="chevron-right"
        onClicked={() => cycle("next")}
        visible={hovered}
      />
    </box>
  );
};

export default function CenterNotch() {
  return (
    <CenterNotchProvider>{() => <CenterNotchInner />}</CenterNotchProvider>
  );
}
