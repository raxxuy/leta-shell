import type { WindowProps } from "@/components/types";
import WallpaperPicker from "./Picker";

export default function WallpaperPickerWindow({
  application,
  monitor,
  visible,
}: WindowProps) {
  return (
    <layerwindow
      anchor={["bottom"]}
      application={application}
      class="mb-12 bg-transparent"
      exclusivity="ignore"
      keyboardMode="on-demand"
      layer="overlay"
      monitor={monitor}
      name="wallpaper-picker"
      namespace="leta-shell-wallpaper-picker"
      visible={visible}
    >
      <box class="min-h-105 min-w-325 rounded-2xl bg-zinc-900 p-4">
        <WallpaperPicker monitor={monitor} />
      </box>
    </layerwindow>
  );
}
