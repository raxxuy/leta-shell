import { createComputed, createState, onCleanup } from "ags";
import { Gtk } from "ags/gtk4";
import { interval } from "ags/time";
import { PopoverButton } from "@/components/button";
import Container from "@/components/Container";
import { Align } from "@/enums";
import { now } from "@/lib/utils";
import ConfigService from "@/services/config";

export default function Clock() {
  const configService = ConfigService.get_default();
  const clock = configService.bind("bar", "modules.clock");

  const [tick, setTick] = createState(0);
  const clockInterval = interval(1000, () => setTick(tick() + 1));

  const classNames = clock((c) => `font-bold text-${c.fontSize}`);

  const time = createComputed(() => {
    tick();
    return now(clock().formats[clock().currentFormat]) as string;
  });

  const handleClick = () => {
    configService.setValue(
      "bar",
      "modules.clock.currentFormat",
      (current) => (current + 1) % clock().formats.length,
    );
  };

  onCleanup(() => clockInterval.cancel());

  return (
    <PopoverButton
      class="px-2"
      halign={Align.CENTER}
      hexpand={false}
      onClicked={handleClick}
      primary
    >
      <label class={classNames} hexpand label={time} />
      <popover>
        <Container>
          <Gtk.Calendar />
        </Container>
      </popover>
    </PopoverButton>
  );
}
