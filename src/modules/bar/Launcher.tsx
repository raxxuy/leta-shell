import { toggleWindow } from "@/lib/utils";
import ConfigManager from "@/services/configs";

export default function Launcher() {
  const configManager = ConfigManager.get_default();
  const icons = configManager.bind("global", "icons");

  const handleClick = () => toggleWindow("launcher");

  return (
    <button class="button" onClicked={handleClick}>
      <image iconName="search" pixelSize={icons((i) => i.pixelSize.small)} />
    </button>
  );
}
