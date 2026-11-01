import { createMemo, createState } from "ags";
import clsx from "clsx";

import { PopoverButton } from "@/components/PopoverButton";
import { Cursors } from "@/constants";
import { useTheme } from "@/providers/ThemeProvider";
import Compact from "./Compact";
import MediaPlayerExpanded from "./MediaPlayer/Expanded";

export default function CenterNotch() {
  const { colors } = useTheme();

  const [open, setOpen] = createState(false);

  const centerNotchClass = createMemo(() => {
    return clsx(
      open() ? "-mt-8 scale-1 opacity-0" : "scale-100",
      `transition-all duration-100 bg-${colors.base()} min-h-11 min-w-26 rounded-b-xl px-4`,
    );
  });

  return (
    <box class={centerNotchClass}>
      <PopoverButton cursor={Cursors.POINTER} hexpand={false}>
        <Compact />
        <popover
          class={colors.base(
            (b) => `m-[5px_10px_15px] rounded-2xl bg-${b} p-4 shadow-md`,
          )}
          hasArrow={false}
          onNotifyVisible={(self) => setOpen(self.visible)}
        >
          <MediaPlayerExpanded />
        </popover>
      </PopoverButton>
    </box>
  );
}
