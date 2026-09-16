import Svg from "@/components/Svg";
import { Align } from "@/enums";
import { toggleWindow } from "@/lib/window/utils";
import { useTheme } from "@/providers/ThemeProvider";

export default function SettingsToggler() {
  const { pixelSize } = useTheme();

  return (
    <button
      class="rounded-lg outline outline-transparent transition-all hover:bg-white/5 active:bg-white/10 active:outline-white/10"
      onClicked={() => toggleWindow("settings")}
      valign={Align.CENTER}
    >
      <Svg class="min-h-8 min-w-8" iconName="cog" pixelSize={pixelSize.lg} />
    </button>
  );
}
