import { useCenterNotch } from "@/hooks/features/center-notch/useCenterNotch";
import MediaPreview from "./MediaPreview";

export default function Compact() {
  const { mode } = useCenterNotch();

  return (
    <box class="min-w-56" hexpand={false}>
      <box visible={mode.is("media")}>
        <MediaPreview />
      </box>
      <box visible={mode.is("weather")}>
        <box>test</box>
      </box>
    </box>
  );
}
