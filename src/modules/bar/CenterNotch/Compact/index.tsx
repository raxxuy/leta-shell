import { With } from "ags";
import useCenterNotchMode from "@/hooks/services/config/useCenterNotchMode";
import { scan } from "@/lib/theme";
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
      {(m) => (
        <box $={scan} class="min-w-56" hexpand={false}>
          {components[m]()}
        </box>
      )}
    </With>
  );
}
