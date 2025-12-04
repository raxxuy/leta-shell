import { type Accessor, createState } from "ags";
import { getConfig } from "@/lib/config";

interface TogglerProps {
  iconName: string | Accessor<string>;
  initActive?: boolean;
  onNotifyActive: (active: boolean) => void;
}

const { icons } = getConfig("bar");

export default function Toggler({
  iconName,
  initActive = false,
  onNotifyActive,
}: TogglerProps) {
  const [active, setActive] = createState<boolean>(initActive);

  return (
    <togglebutton
      active={initActive}
      class={active((a) => (a ? "toggler active" : "toggler inactive"))}
      onNotifyActive={({ active }) => {
        setActive(active);
        onNotifyActive(active);
      }}
    >
      <image iconName={iconName} pixelSize={icons.pixelSize.large} />
    </togglebutton>
  );
}
