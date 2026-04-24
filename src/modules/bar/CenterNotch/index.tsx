import { createState } from "ags";
import { Gtk } from "ags/gtk4";
import clsx from "clsx/lite";
import { Cursor } from "@/constants";
import { useCenterNotchMode } from "@/hooks/useCenterNotchMode";
import { loadClasses } from "@/lib/theme";
import Compact from "./Compact";
import Expanded from "./Expanded";

export default function CenterNotch() {
  const { switchMode } = useCenterNotchMode();
  const [open, setOpen] = createState(false);
  const [hovered, setHovered] = createState(false);

  const className = open((o) =>
    clsx(
      "my-1 rounded-lg bg-zinc-950/95 px-4 py-2 transition-all hover:px-6 shadow-lg",
      o && "transform-[scale(0.01)]",
    ),
  );

  return (
    <box $={loadClasses(CenterNotch)} class={className}>
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
          class="mx-1 mb-1 rounded-xl bg-zinc-950/95 p-4 shadow-lg transition-all"
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
