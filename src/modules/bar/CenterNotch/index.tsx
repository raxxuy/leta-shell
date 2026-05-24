import { Gtk } from "ags/gtk4";
import { Cursor } from "@/constants";
import { useCenterNotch } from "@/hooks/features/center-notch/useCenterNotch";
import Compact from "./Compact";
import Expanded from "./Expanded";

export default function CenterNotch() {
  const notch = useCenterNotch();

  return (
    <box class={notch.ui.className}>
      <Gtk.EventControllerMotion
        onEnter={() => notch.state.setHovered(true)}
        onLeave={() => notch.state.setHovered(false)}
      />
      <button
        class="mr-2"
        iconName="chevron-left"
        onClicked={() => notch.mode.cycle(-1)}
        visible={notch.state.hovered}
      />
      <menubutton cursor={Cursor.POINTER}>
        <Compact />
        <popover
          class="m-[5px_10px_15px] rounded-2xl bg-zinc-950/95 p-4 shadow-md"
          hasArrow={false}
          onNotifyVisible={(self) => notch.state.setOpen(self.visible)}
        >
          <Expanded />
        </popover>
      </menubutton>
      <button
        class="ml-2"
        iconName="chevron-right"
        onClicked={() => notch.mode.cycle(1)}
        visible={notch.state.hovered}
      />
    </box>
  );
}
