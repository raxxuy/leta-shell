import { Button } from "@/components/button";
import { useGlobalConfig } from "@/hooks/useConfig";
import { toggleWindow } from "@/utils";

export default function Launcher() {
  const { iconSize } = useGlobalConfig();

  const handleClick = () => toggleWindow("launcher");

  return (
    <Button onClicked={handleClick}>
      <image class="w-6" iconName="search" pixelSize={iconSize("small")} />
    </Button>
  );
}
