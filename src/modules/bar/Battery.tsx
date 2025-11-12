import AstalBattery from "gi://AstalBattery";
import { createBinding } from "ags";

export default function Battery() {
  const battery = AstalBattery.get_default();
  const isPresent = createBinding(battery, "isPresent");
  const percentage = createBinding(battery, "percentage");
  const batteryIconName = createBinding(battery, "batteryIconName");

  return (
    <box visible={isPresent} class="battery" spacing={4}>
      <image iconName={batteryIconName} />
      <label
        class="battery-label"
        label={percentage.as(
          (percentage) => `${Math.floor(percentage * 100)}%`,
        )}
      />
    </box>
  );
}
