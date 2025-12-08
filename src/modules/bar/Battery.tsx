import AstalBattery from "gi://AstalBattery";
import { createBinding, createComputed, createState } from "ags";
import { Gtk } from "ags/gtk4";
import { RevealerTransitionType } from "@/enums";
import { getConfig } from "@/lib/config";
import { getIcon } from "@/lib/icons";
import { formatPercentage, formatTime } from "@/lib/utils";

const { icons, spacings } = getConfig("bar");

export default function Battery() {
  const [revealed, setRevealed] = createState<boolean>(false);
  const battery = AstalBattery.get_default();
  const isPresent = createBinding(battery, "isPresent");
  const charging = createBinding(battery, "charging");
  const percentage = createBinding(battery, "percentage");

  const iconName = createComputed(() =>
    getIcon("battery", percentage(), charging()),
  );

  const tooltipText = createComputed(() => {
    percentage();
    const label = charging() ? "Time to full" : "Time to empty";
    const time = charging() ? battery.timeToFull : battery.timeToEmpty;
    return `${label}: ${formatTime(time)}`;
  });

  return (
    <box visible={isPresent} class="battery" spacing={spacings.small}>
      <Gtk.EventControllerMotion
        onEnter={() => setRevealed(true)}
        onLeave={() => setRevealed(false)}
      />
      <revealer
        visible={revealed}
        revealChild={revealed}
        transitionType={RevealerTransitionType.SWING_LEFT}
      >
        <label
          class="battery-label text-large"
          label={percentage(formatPercentage)}
        />
      </revealer>
      <image
        class="battery-icon"
        iconName={iconName}
        pixelSize={icons.pixelSize.small}
        tooltipText={tooltipText}
      />
    </box>
  );
}
