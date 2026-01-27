import { Button } from "@/components/button";
import { toggleWindow } from "@/lib/utils";
import ConfigService from "@/services/config";

export default function Launcher() {
  const icons = ConfigService.bind("global", "icons");

  const handleClick = () => toggleWindow("launcher");

  return (
    <Button onClicked={handleClick}>
      <image iconName="search" pixelSize={icons((i) => i.pixelSize.small)} />
    </Button>
  );
}
