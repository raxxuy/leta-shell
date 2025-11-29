import AstalBattery from "gi://AstalBattery";
import { createBinding, createComputed, createState } from "ags";
import { Gtk } from "ags/gtk4";
import { RevealerTransitionType } from "@/enums";
import { getConfig } from "@/lib/config";

const { icons, spacings } = getConfig("bar");

export default function Battery() {
  const [revealed, setRevealed] = createState<boolean>(false);
  const battery = AstalBattery.get_default();
  const isPresent = createBinding(battery, "isPresent");
  const charging = createBinding(battery, "charging");
  const percentage = createBinding(battery, "percentage");

  const iconName = createComputed(
    [charging, percentage],
    (charging, percentage) => {
      if (charging) return "battery-charging-symbolic";
      if (percentage <= 0.05) return "battery-empty-symbolic";
      if (percentage <= 0.3) return "battery-low-symbolic";
      if (percentage <= 0.7) return "battery-mid-symbolic";
      return "battery-full-symbolic";
    },
  );

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
          class="battery-label"
          label={percentage.as(
            (percentage) => `${Math.floor(percentage * 100)}%`,
          )}
        />
      </revealer>
      <image
        class="battery-icon"
        iconName={iconName}
        pixelSize={icons.pixelSize.small}
      />
    </box>
  );
}
