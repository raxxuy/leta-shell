import { getConfig } from "@/lib/config";
import { toggleWindow } from "@/lib/utils";

const { icons } = getConfig("global");

export default function Launcher() {
  const handleClick = () => toggleWindow("launcher");

  return (
    <button class="launcher button" onClicked={handleClick}>
      <image iconName="search" pixelSize={icons.pixelSize.small} />
    </button>
  );
}
