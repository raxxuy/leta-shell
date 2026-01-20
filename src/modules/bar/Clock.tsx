import { createComputed, createState, onCleanup } from "ags";
import { Gtk } from "ags/gtk4";
import { interval } from "ags/time";
import { Align } from "@/enums";
import { now } from "@/lib/utils";
import ConfigManager from "@/services/configs";
import Container from "@/widgets/Container";
import PopoverButton from "@/widgets/PopoverButton";

export default function Clock() {
  const configManager = ConfigManager.get_default();
  const clock = configManager.bind("bar", "modules.clock");

  const [tick, setTick] = createState(0);
  const clockInterval = interval(1000, () => setTick(tick() + 1));

  const time = createComputed(() => {
    tick();
    return now(clock().formats[clock().currentFormat]) as string;
  });

  const handleClick = () => {
    configManager.setValue(
      "bar",
      "modules.clock.currentFormat",
      (current) => (current + 1) % clock().formats.length,
    );
  };

  onCleanup(() => clockInterval.cancel());

  return (
    <PopoverButton
      class="button px-2"
      onClicked={handleClick}
      primary
      signal="released"
    >
      <label
        class={clock((c) => `font-bold text-${c.fontSize}`)}
        halign={Align.CENTER}
        label={time}
        xalign={0}
      />
      <popover>
        <Container>
          <Gtk.Calendar />
        </Container>
      </popover>
    </PopoverButton>
  );
}
