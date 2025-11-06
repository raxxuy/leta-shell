import { Gtk } from "ags/gtk4";
import { interval } from "ags/time";
import { createState } from "gnim";
import { now } from "@/constants";

const FORMATS = {
  NORMAL: "%H:%M",
  DETAILED: "%H:%M:%S",
};

export default function Clock() {
  const [format, setFormat] = createState(FORMATS.NORMAL);
  const [isHovered, setIsHovered] = createState(false);

  const getCurrentTime = () => now().format(format.get()) as string;

  const [time, setTime] = createState(getCurrentTime());

  const handleMouseEnter = () => {
    setIsHovered(true);
    setFormat(FORMATS.DETAILED);
    setTime(now().format(FORMATS.DETAILED) as string);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setFormat(FORMATS.NORMAL);
    setTime(now().format(FORMATS.NORMAL) as string);
  };

  interval(1000, () => setTime(getCurrentTime()));

  return (
    <box>
      <Gtk.EventControllerMotion
        onEnter={handleMouseEnter}
        onLeave={handleMouseLeave}
      />
      <label
        class={isHovered((hover) => `clock ${hover ? "hover" : "normal"}`)}
        label={time}
      />
    </box>
  );
}
