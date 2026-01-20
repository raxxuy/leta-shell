import AstalBattery from "gi://AstalBattery";
import { createBinding, createComputed, createState } from "ags";
import { Gtk } from "ags/gtk4";
import { RevealerTransitionType } from "@/enums";
import { getIcon } from "@/lib/icons";
import { formatPercentage, timeTo } from "@/lib/utils";
import ConfigManager from "@/services/configs";

export default function Battery() {
  const battery = AstalBattery.get_default();
  const configManager = ConfigManager.get_default();
  const icons = configManager.bind("global", "icons");
  const spacings = configManager.bind("global", "spacings");
  const charging = createBinding(battery, "charging");
  const isPresent = createBinding(battery, "isPresent");
  const percentage = createBinding(battery, "percentage");

  const [revealed, setRevealed] = createState<boolean>(false);

  const iconName = createComputed(() =>
    getIcon("battery", percentage(), charging()),
  );

  const tooltipText = createComputed(() => {
    percentage();
    return timeTo(charging(), battery);
  });

  return (
    <box spacing={spacings((s) => s.small)} visible={isPresent}>
      <Gtk.EventControllerMotion
        onEnter={() => setRevealed(true)}
        onLeave={() => setRevealed(false)}
      />
      <revealer
        visible={revealed}
        revealChild={revealed}
        transitionType={RevealerTransitionType.SWING_LEFT}
      >
        <label class="font-bold" label={percentage(formatPercentage)} />
      </revealer>
      <image
        iconName={iconName}
        pixelSize={icons((i) => i.pixelSize.small)}
        tooltipText={tooltipText}
      />
    </box>
  );
}
