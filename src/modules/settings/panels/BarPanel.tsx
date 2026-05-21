import InputField from "@/components/ui/input/InputField";
import Select from "@/components/ui/input/Select";
import { Orientation } from "@/enums";
import useConfig from "@/hooks/services/useConfig";
import useSpacing from "@/hooks/services/useSpacing";
import { scan } from "@/lib/theme";
import { SettingRow } from "../Row";

const positions = ["top", "bottom"] as const;

export default function BarPanel() {
  const spacing = useSpacing();
  const [height, setHeight] = useConfig("bar", "height");
  const [position, setPosition] = useConfig("bar", "position");

  return (
    <box $={scan} orientation={Orientation.VERTICAL} spacing={spacing.lg}>
      {/* Max Results */}
      <SettingRow label="Height">
        <InputField
          onChange={setHeight as (v: number) => void}
          type="number"
          value={height}
        />
      </SettingRow>

      <SettingRow label="Position">
        <Select
          onChange={setPosition as (v: string) => void}
          options={positions}
          value={position}
        />
      </SettingRow>
    </box>
  );
}
