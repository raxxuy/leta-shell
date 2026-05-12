import { With } from "ags";
import useCenterNotchMode from "@/hooks/features/center-notch/useCenterNotchMode";
import { scan } from "@/lib/theme";
import MediaPreview from "./MediaPreview";

const components = {
  media: () => <MediaPreview />,
  weather: () => <box>test</box>,
};

export default function Compact() {
  const { mode } = useCenterNotchMode();

  return (
    <With value={mode}>
      {(m) => (
        <box $={scan} class="min-w-56" hexpand={false}>
          {components[m]()}
        </box>
      )}
    </With>
  );
}
