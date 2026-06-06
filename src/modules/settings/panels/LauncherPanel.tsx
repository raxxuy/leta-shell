import { Orientation } from "@/enums";
import useConfig from "@/hooks/services/config/useConfig";
import { useSpacing } from "@/hooks/services/useSpacing";
import { scan } from "@/lib/theme";
import Select from "@/modules/settings/components/Select";
import Stepper from "@/modules/settings/components/Stepper";
import Row from "../components/Row";

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
      <Row label="Max Results">
        <Stepper max={10} min={0} onChange={setMaxResults} value={maxResults} />
      </Row>

      {/* Search Engine */}
      <Row label="Search Engine">
        <Select
          onChange={setSearchEngine}
          options={engines}
          value={searchEngine}
        />
      </Row>
    </box>
  );
}
