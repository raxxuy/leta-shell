import Button from "@/components/button/Button";
import { toggleWindow } from "@/lib/utils";
import ConfigManager from "@/services/configs";

export default function Launcher() {
  const icons = ConfigManager.bind("global", "icons");

  const handleClick = () => toggleWindow("launcher");

  return (
    <Button onClicked={handleClick}>
      <image iconName="search" pixelSize={icons((i) => i.pixelSize.small)} />
    </Button>
  );
}
