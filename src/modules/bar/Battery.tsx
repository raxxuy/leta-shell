import AstalBattery from "gi://AstalBattery";
import { createBinding, createComputed, createState } from "ags";
import { Gtk } from "ags/gtk4";
import { RevealerTransitionType } from "@/enums";
import { getConfig } from "@/lib/config";
import { getIcon } from "@/lib/icons";
import { formatPercentage, timeTo } from "@/lib/utils";

const { icons, spacings } = getConfig("global");

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
    return timeTo(charging(), battery);
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
        <label class="font-bold" label={percentage(formatPercentage)} />
      </revealer>
      <image
        iconName={iconName}
        pixelSize={icons.pixelSize.small}
        tooltipText={tooltipText}
      />
    </box>
  );
}
