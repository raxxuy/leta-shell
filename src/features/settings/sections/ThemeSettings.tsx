import { Orientation } from "@/enums";
import { toClassValue } from "@/lib/theme/color";
import {
  ThemeConfigProvider,
  useThemeConfig,
} from "@/providers/ConfigProvider";
import { useTheme } from "@/providers/ThemeProvider";
import SettingsGroup from "../components/Group";
import NumberField from "../components/NumberField";
import ObjectField from "../components/ObjectField";
import SettingsRow from "../components/Row";
import TextField from "../components/TextField";

const scaleKeys = ["xs", "sm", "md", "lg", "xl"] as const;

const descriptions = {
  xs: "Extra small spacing",
  sm: "Small spacing",
  md: "Medium spacing",
  lg: "Large spacing",
  xl: "Extra large spacing",
} as const;

const ThemeSettingsInner = () => {
  const { spacing: sp } = useTheme();
  const { colors, spacing, pixelSize, setValue } = useThemeConfig();

  return (
    <box hexpand orientation={Orientation.VERTICAL} spacing={sp.lg}>
      <SettingsGroup
        description="Control the amount of space between elements."
        title="Spacing"
      >
        {scaleKeys.map((key) => (
          <SettingsRow description={descriptions[key]} title={key} uppercase>
            <NumberField
              onCommit={(value) =>
                setValue("spacing", {
                  ...spacing.peek(),
                  [key]: value,
                })
              }
              value={spacing((s) => s[key])}
            />
          </SettingsRow>
        ))}
      </SettingsGroup>

      <SettingsGroup
        description="Control the base dimensions used throughout the shell."
        title="Pixel size"
      >
        {scaleKeys.map((key) => (
          <SettingsRow description={descriptions[key]} title={key} uppercase>
            <NumberField
              onCommit={(value) =>
                setValue("pixelSize", {
                  ...pixelSize.peek(),
                  [key]: value,
                })
              }
              value={pixelSize((p) => p[key])}
            />
          </SettingsRow>
        ))}
      </SettingsGroup>

      <SettingsGroup
        description="Customize the colors used throughout the shell."
        title="Colors"
      >
        <SettingsRow
          description="Primary background color used throughout the shell."
          title="Base"
        >
          <ObjectField
            onCommit={(value: { value: string; opacity: number }) =>
              setValue("colors", {
                ...colors.peek(),
                base: value,
              })
            }
            value={colors((c) => c.base)}
          >
            {(value, setValue) => (
              <>
                <TextField
                  onCommit={(value) => setValue("value", toClassValue(value))}
                  placeholder="Value (#ffffff, zinc-950)"
                  value={value.value}
                />

                <NumberField
                  max={100}
                  min={0}
                  onCommit={(opacity) => setValue("opacity", opacity)}
                  placeholder="Opacity (0-100)"
                  value={value.opacity}
                />
              </>
            )}
          </ObjectField>
        </SettingsRow>
      </SettingsGroup>
    </box>
  );
};

export default function ThemeSettings() {
  return (
    <ThemeConfigProvider>{() => <ThemeSettingsInner />}</ThemeConfigProvider>
  );
}
