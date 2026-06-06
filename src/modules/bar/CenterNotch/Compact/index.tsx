import { useCenterNotch } from "@/hooks/features/center-notch/useCenterNotch";
import { MprisProvider } from "@/providers/MprisProvider";
import MediaPreview from "./MediaPreview";

export default function Compact() {
  const { mode } = useCenterNotch();

  return (
    <box class="min-w-56" hexpand={false}>
      <box visible={mode.is("media")}>
        <MprisProvider>{() => <MediaPreview />}</MprisProvider>
      </box>
      <box visible={mode.is("weather")}>
        <box>test</box>
      </box>
    </box>
  );
}
