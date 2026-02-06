import { createState, With } from "ags";
import clsx from "clsx";
import { startCase } from "es-toolkit";
import { Align, Orientation } from "@/enums";
import { useGlobalConfig } from "@/hooks/useConfig";
import { configs } from "@/lib/config";
import ConfigService from "@/services/config";
import type { ConfigKey, ConfigType, Get, Path } from "@/types/config";
import ConfigField from "./ConfigField";

type FieldPath = Path<ConfigType<ConfigKey>>;
type FieldValue = Get<ConfigType<ConfigKey>, FieldPath>;

export default function Configs() {
  const { spacing } = useGlobalConfig();
  const [currentConfig, setCurrentConfig] = createState<ConfigKey>("bar");

  return (
    <box
      class="p-4"
      hexpand
      orientation={Orientation.VERTICAL}
      spacing={spacing("large")}
      valign={Align.START}
      vexpand
    >
      {/* Config Tabs */}
      <box spacing={spacing("medium")}>
        {Object.keys(configs).map((config) => (
          <button
            class={currentConfig((c) =>
              clsx(
                "rounded border-1 border-transparent px-4 py-2 font-bold text-lg transition duration-100",
                c === config
                  ? "border-background-lighter bg-background-lighter"
                  : "hover:border-background-lighter hover:bg-background-light",
              ),
            )}
            onClicked={() => setCurrentConfig(config as ConfigKey)}
          >
            {startCase(config)}
          </button>
        ))}
      </box>

      {/* Config Editor */}
      <scrolledwindow propagateNaturalHeight propagateNaturalWidth>
        <With value={currentConfig}>
          {(configKey) => (
            <box
              class="p-4"
              halign={Align.START}
              orientation={Orientation.VERTICAL}
              spacing={spacing("medium")}
            >
              {Object.entries(configs[configKey]).map(([key, value]) => {
                return (
                  <ConfigField
                    configKey={configKey}
                    label={key}
                    onUpdate={(path, value) =>
                      ConfigService.setValue(
                        configKey,
                        path as FieldPath,
                        value as FieldValue,
                      )
                    }
                    path={key}
                    value={value}
                  />
                );
              })}
            </box>
          )}
        </With>
      </scrolledwindow>
    </box>
  );
}
