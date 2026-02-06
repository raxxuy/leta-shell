import AstalBattery from "gi://AstalBattery";
import { createBinding, createComputed, createState } from "ags";
import { Gtk } from "ags/gtk4";
import { RevealerTransitionType } from "@/enums";
import { useGlobalConfig } from "@/hooks/useConfig";
import { getIcon } from "@/lib/icons";
import { formatPercentage, formatSeconds } from "@/utils";

export default function Battery() {
  const { spacing, iconSize } = useGlobalConfig();
  const battery = AstalBattery.get_default();
  const charging = createBinding(battery, "charging");
  const isPresent = createBinding(battery, "isPresent");
  const percentage = createBinding(battery, "percentage");

  const [revealed, setRevealed] = createState<boolean>(false);

  const iconName = createComputed(() =>
    getIcon({
      type: "battery",
      percentage: percentage(),
      charging: charging(),
    }),
  );

  const tooltipText = createComputed(() => {
    percentage();
    const label = charging() ? "Time to full" : "Time to empty";
    const time = charging() ? battery.timeToFull : battery.timeToEmpty;
    return `${label}: ${formatSeconds(time, "%-Hh %-Mm")}`;
  });

  const handleHover = (entering: boolean) => setRevealed(entering);

  return (
    <box spacing={spacing("small")} visible={isPresent}>
      <Gtk.EventControllerMotion
        onEnter={() => handleHover(true)}
        onLeave={() => handleHover(false)}
      />
      {/** biome-ignore assist/source/useSortedAttributes: rendering issues */}
      <revealer
        visible={revealed}
        revealChild={revealed}
        transitionType={RevealerTransitionType.SWING_LEFT}
      >
        <label class="font-bold" label={percentage(formatPercentage)} />
      </revealer>
      <image
        class="w-6"
        iconName={iconName}
        pixelSize={iconSize("small")}
        tooltipText={tooltipText}
      />
    </box>
  );
}
