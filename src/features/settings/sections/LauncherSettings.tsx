import { Orientation } from "@/enums";
import { AppsQuerySchema } from "@/lib/config/schemas/launcher";
import {
  LauncherConfigProvider,
  useLauncherConfig,
} from "@/providers/ConfigProvider";
import { useTheme } from "@/providers/ThemeProvider";
import SettingsGroup from "../components/Group";
import NumberField from "../components/NumberField";
import SettingsRow from "../components/Row";
import SelectField from "../components/SelectField";
import SwitchField from "../components/SwitchField";

const LauncherSettingsInner = () => {
  const { spacing } = useTheme();
  const {
    maxResults,
    "providers.apps.enabled": appsEnabled,
    "providers.apps.query": appsQuery,
    setValue,
  } = useLauncherConfig();

  return (
    <box hexpand orientation={Orientation.VERTICAL} spacing={spacing.lg}>
      <SettingsGroup
        description="Configure general launcher behavior."
        title="General"
      >
        <SettingsRow
          description="The maximum number of results to show in the launcher."
          title="Max Results"
        >
          <NumberField
            max={10}
            min={1}
            onCommit={(value) => setValue("maxResults", value)}
            value={maxResults}
          />
        </SettingsRow>
      </SettingsGroup>

      <SettingsGroup
        description="Configure the providers used by the launcher."
        title="Providers"
      >
        <SettingsGroup description="Configure the apps provider." title="Apps">
          <SettingsRow
            description="Whether the apps provider is enabled."
            title="Enabled"
          >
            <SwitchField
              onCommit={(value) => setValue("providers.apps.enabled", value)}
              value={appsEnabled}
            />
          </SettingsRow>

          <SettingsRow
            description="The query string used to search for apps."
            title="Query"
          >
            <SelectField
              onCommit={(value) => setValue("providers.apps.query", value)}
              options={AppsQuerySchema.options}
              value={appsQuery}
            >
              {(option) => <label label={option} />}
            </SelectField>
          </SettingsRow>
        </SettingsGroup>
      </SettingsGroup>
    </box>
  );
};

export default function LauncherSettings() {
  return (
    <LauncherConfigProvider>
      {() => <LauncherSettingsInner />}
    </LauncherConfigProvider>
  );
}
