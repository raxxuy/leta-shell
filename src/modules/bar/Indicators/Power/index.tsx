import clsx from "clsx/lite";
import MenuButton from "@/components/ui/MenuButton";
import Popover from "@/components/ui/Popover";
import { Align, Orientation } from "@/enums";
import usePixelSize from "@/hooks/core/usePixelSize";
import useSpacing from "@/hooks/core/useSpacing";
import useBattery from "@/hooks/features/power/useBattery";
import Profiles from "./Profiles";

export default function Power() {
  const spacing = useSpacing();
  const pixelSize = usePixelSize();
  const {
    percentage,
    isPresent,
    formattedPercentage,
    iconName,
    detailedLabel,
  } = useBattery();

  return (
    <MenuButton
      class="min-h-6.5 min-w-6.5 rounded-lg transition-colors checked:bg-zinc-700 hover:bg-zinc-800 active:bg-zinc-800"
      visible={isPresent}
    >
      <image iconName={iconName} pixelSize={pixelSize.sm} />
      <Popover
        animated
        class="m-[5px_10px_15px] mt-4 min-w-sm rounded-2xl border border-tertiary/20 bg-zinc-950/95 p-6 shadow-md"
        hasArrow={false}
      >
        <box orientation={Orientation.VERTICAL} spacing={spacing.lg}>
          <box hexpand valign={Align.CENTER}>
            <label class="font-semibold opacity-90" label="Battery" />
            <label
              class="font-semibold text-sm opacity-60"
              halign={Align.END}
              hexpand
              label={detailedLabel}
              xalign={1}
            />
          </box>
          <box hexpand valign={Align.CENTER}>
            <levelbar
              class={clsx(
                "min-h-2 min-w-xs rounded-full bg-white/10",
                "[&>trough_*]:rounded-full [&>trough_.empty]:bg-white/10 [&>trough_.filled]:bg-primary/95",
              )}
              halign={Align.START}
              hexpand
              maxValue={1}
              minValue={0}
              orientation={Orientation.HORIZONTAL}
              valign={Align.CENTER}
              value={percentage}
            />
            <label
              class="min-w-14 font-semibold text-[15px]"
              halign={Align.END}
              label={formattedPercentage}
              xalign={1}
            />
          </box>
          <box class="rounded-full border border-zinc-800" />
          <Profiles />
        </box>
      </Popover>
    </MenuButton>
  );
}
