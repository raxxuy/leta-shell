import { With } from "ags";
import { useCenterNotchMode } from "@/hooks/services/config/useCenterNotchMode";
import MediaPreview from "./MediaPreview";
import WeatherPreview from "./WeatherPreview";

const components = {
  media: () => <MediaPreview />,
  weather: () => <WeatherPreview />,
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
