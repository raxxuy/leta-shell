import { Gtk } from "ags/gtk4";
import { Cursor } from "@/constants";
import useCenterNotchMode from "@/hooks/features/center-notch/useCenterNotchMode";
import useCenterNotchState from "@/hooks/features/center-notch/useCenterNotchState";
import Compact from "./Compact";
import Expanded from "./Expanded";

export default function CenterNotch() {
  const { switchMode } = useCenterNotchMode();
  const { setOpen, hovered, setHovered, className } = useCenterNotchState();

  return (
    <box class={className}>
      <Gtk.EventControllerMotion
        onEnter={() => setHovered(true)}
        onLeave={() => setHovered(false)}
      />
      <button
        class="mr-2"
        iconName="chevron-left"
        onClicked={() => switchMode(-1)}
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
        onClicked={() => switchMode(1)}
        visible={hovered}
      />
    </box>
  );
}
