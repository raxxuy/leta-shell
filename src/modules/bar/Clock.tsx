import { createState, onCleanup } from "ags";
import { Gtk } from "ags/gtk4";
import { interval } from "ags/time";
import { getNestedValue, now } from "@/lib/utils";
import Container from "@/widgets/Container";
import MenuButton from "@/widgets/MenuButton";

const clock = getNestedValue("bar", "modules.clock");

export default function Clock() {
  const getCurrentTime = () => now(clock.format) as string;
  const [time, setTime] = createState<string>(getCurrentTime());

  const clockInterval = interval(1000, () => setTime(getCurrentTime()));

  onCleanup(() => clockInterval.cancel());

  return (
    <MenuButton class="button">
      <label
        class={`w-40 px-2 font-bold text-${clock.fontSize}`}
        label={time}
      />
      <popover>
        <Container>
          <Gtk.Calendar />
        </Container>
      </popover>
    </MenuButton>
  );
}
