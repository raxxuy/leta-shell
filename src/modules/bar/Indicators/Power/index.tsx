import clsx from "clsx/lite";
import MenuButton from "@/components/ui/MenuButton";
import Popover from "@/components/ui/Popover";
import { Align, Orientation } from "@/enums";
import useBattery from "@/hooks/features/power/useBattery";
import usePixelSize from "@/hooks/services/usePixelSize";
import useSpacing from "@/hooks/services/useSpacing";
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
    <MenuButton class="bar-menubutton" focusable={false} visible={isPresent}>
      <image iconName={iconName} pixelSize={pixelSize.sm} />
      <Popover animated class="bar-popover min-w-sm" hasArrow={false}>
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
