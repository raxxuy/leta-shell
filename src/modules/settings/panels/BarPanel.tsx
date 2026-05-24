import { Orientation } from "@/enums";
import useBarConfig from "@/hooks/services/config/useBarConfig";
import useSpacing from "@/hooks/services/useSpacing";
import { CenterNotchModeEnum } from "@/lib/config/schemas/modules/center-notch";
import { scan } from "@/lib/theme";
import InputField from "@/modules/settings/components/InputField";
import Select from "@/modules/settings/components/Select";
import Stepper from "@/modules/settings/components/Stepper";
import { Row } from "../components/Row";
import { Section } from "../components/Section";

const positions = ["top", "bottom"] as const;
const centerNotchModes = CenterNotchModeEnum.options;

export default function BarPanel() {
  const spacing = useSpacing();
  const {
    height: [height, setHeight],
    position: [position, setPosition],
    clockFormat: [clockFormat, setClockFormat],
    workspaceCount: [workspaceCount, setWorkspaceCount],
    centerNotchMode: [centerNotchMode, setCenterNotchMode],
    visualizerCount: [visualizerCount, setVisualizerCount],
  } = useBarConfig();

  return (
    <box $={scan} orientation={Orientation.VERTICAL} spacing={spacing.xl}>
      {/* Max Results */}
      <Section title="Bar Settings">
        <Row label="Height">
          <InputField onChange={setHeight} type="number" value={height} />
        </Row>
        <Row label="Position">
          <Select onChange={setPosition} options={positions} value={position} />
        </Row>
      </Section>

      <Section title="Bar Module Settings">
        <Row label="Workspace Count">
          <Stepper
            max={10}
            min={1}
            onChange={setWorkspaceCount}
            value={workspaceCount}
          />
        </Row>
        <Row
          label="Clock Format"
          tooltip="Change clock format based on the <b>GLib.DateTime</b> format"
          tooltipUrl="https://docs.gtk.org/glib/method.DateTime.format.html"
        >
          <InputField
            onChange={setClockFormat}
            type="text"
            value={clockFormat}
          />
        </Row>
        <Row label="Center Notch Mode">
          <Select
            onChange={setCenterNotchMode}
            options={centerNotchModes}
            value={centerNotchMode}
          />
        </Row>
        <Row label="Media Visualizer Count">
          <Stepper
            max={12}
            min={1}
            onChange={setVisualizerCount}
            value={visualizerCount}
          />
        </Row>
      </Section>
    </box>
  );
}
