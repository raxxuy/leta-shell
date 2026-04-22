import { With } from "ags";
import { useCenterNotchMode } from "@/hooks/useCenterNotchMode";
import MediaPreview from "./MediaPreview";

const components = {
  media: () => <MediaPreview />,
  weather: () => <box>test</box>,
};

export default function Compact() {
  const { mode } = useCenterNotchMode();

  return (
    <With value={mode}>
      {(mode) => (
        <box class="min-w-4xs" hexpand={false}>
          {components[mode]()}
        </box>
      )}
    </With>
  );
}
