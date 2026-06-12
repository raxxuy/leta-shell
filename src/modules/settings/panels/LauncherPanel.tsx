import { Orientation } from "@/enums";
import { useLauncher } from "@/hooks/features/launcher/useLauncher";
import { useSpacing } from "@/hooks/services/useSpacing";
import { scan } from "@/lib/theme";
import Select from "@/modules/settings/components/Select";
import Stepper from "@/modules/settings/components/Stepper";
import InputField from "../components/InputField";
import Row from "../components/Row";
import Section from "../components/Section";

const engines = ["google", "duckduckgo", "brave"] as const;

export default function LauncherPanel() {
  const spacing = useSpacing();
  const {
    maxResults: [maxResults, setMaxResults],
    webSearchEngine: [webSearchEngine, setWebSearchEngine],
    width: [width, setWidth],
  } = useLauncher();

  return (
    <box $={scan} orientation={Orientation.VERTICAL} spacing={spacing.lg}>
      <Section title="Launcher Settings">
        {/* Width */}
        <Row label="Width">
          <InputField onChange={setWidth} type="number" value={width} />
        </Row>

        {/* Max Results */}
        <Row label="Max Results">
          <Stepper
            max={10}
            min={0}
            onChange={setMaxResults}
            value={maxResults}
          />
        </Row>

        {/* Search Engine */}
        <Row label="Search Engine">
          <Select
            onChange={setWebSearchEngine}
            options={engines}
            value={webSearchEngine}
          />
        </Row>
      </Section>
    </box>
  );
}
