import { createState, onCleanup } from "ags";
import { Gtk } from "ags/gtk4";
import { interval } from "ags/time";
import { configs } from "@/lib/config";
import { now } from "@/lib/utils/time";

export default function Clock() {
  const initialFormat = configs.bar.modules.clock.format;
  const [format, setFormat] = createState(initialFormat);

  const getCurrentTime = () => now().format(format.get()) as string;
  const [time, setTime] = createState(getCurrentTime());

  const handleMouseEnter = () => {
    setFormat("%a %H:%M:%S");
    setTime(getCurrentTime());
  };

  const handleMouseLeave = () => {
    setFormat(initialFormat);
    setTime(getCurrentTime());
  };

  const clockInterval = interval(1000, () => setTime(getCurrentTime()));

  onCleanup(() => clockInterval.cancel());

  return (
    <box class="clock">
      <Gtk.EventControllerMotion
        onEnter={handleMouseEnter}
        onLeave={handleMouseLeave}
      />
      <label class="clock-label" label={time} />
    </box>
  );
}
