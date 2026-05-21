import useCenterNotchMode from "@/hooks/features/center-notch/useCenterNotchMode";
import MediaPreview from "./MediaPreview";

export default function Compact() {
  const { mode } = useCenterNotchMode();

  return (
    <box class="min-w-56" hexpand={false}>
      <box visible={mode((m) => m === "media")}>
        <MediaPreview />
      </box>
      <box visible={mode((m) => m === "weather")}>
        <box>test</box>
      </box>
    </box>
  );
}
