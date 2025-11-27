import AstalBattery from "gi://AstalBattery";
import { createBinding, createState } from "ags";
import { Gtk } from "ags/gtk4";
import { RevealerTransitionType } from "@/enums";
import { getConfig } from "@/lib/config";

const { icons, spacings } = getConfig("bar");

export default function Battery() {
  const [revealed, setRevealed] = createState<boolean>(false);
  const battery = AstalBattery.get_default();
  const isPresent = createBinding(battery, "isPresent");
  const percentage = createBinding(battery, "percentage");
  const batteryIconName = createBinding(battery, "batteryIconName");

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
        iconName={batteryIconName}
        pixelSize={icons.pixelSize}
      />
    </box>
  );
}
