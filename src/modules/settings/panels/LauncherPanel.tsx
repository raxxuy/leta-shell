import Select from "@/components/ui/input/Select";
import Stepper from "@/components/ui/input/Stepper";
import { Orientation } from "@/enums";
import useConfig from "@/hooks/services/useConfig";
import useSpacing from "@/hooks/services/useSpacing";
import { scan } from "@/lib/theme";
import { SettingRow } from "../Row";

const engines = ["google", "duckduckgo", "brave"] as const;

export default function LauncherPanel() {
  const spacing = useSpacing();
  const [maxResults, setMaxResults] = useConfig("launcher", "maxResults");
  const [searchEngine, setSearchEngine] = useConfig(
    "launcher",
    "providers.web.searchEngine",
  );

  return (
    <box $={scan} orientation={Orientation.VERTICAL} spacing={spacing.lg}>
      {/* Max Results */}
      <SettingRow label="Max Results">
        <Stepper max={10} min={0} onChange={setMaxResults} value={maxResults} />
      </SettingRow>

      {/* Search Engine */}
      <SettingRow label="Search Engine">
        <Select
          onChange={setSearchEngine as (v: string) => void}
          options={engines}
          value={searchEngine}
        />
      </SettingRow>
    </box>
  );
}
