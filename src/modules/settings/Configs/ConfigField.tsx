import { For } from "ags";
import { startCase } from "es-toolkit";
import { Align, Orientation } from "@/enums";
import { useGlobalConfig } from "@/hooks/useConfig";
import ConfigService from "@/services/config";
import type { ConfigKey, ConfigType, Path } from "@/types/config";

type Value = number | boolean | string | object;

interface ConfigFieldProps {
  configKey: ConfigKey;
  path: string;
  label?: string;
  value: Value;
  onUpdate: (path: string, value: Value) => void;
  depth?: number;
}

type FieldPath = Path<ConfigType<ConfigKey>>;

export default function ConfigField({
  configKey,
  path,
  label,
  value,
  onUpdate,
  depth = 0,
}: ConfigFieldProps) {
  const { spacing } = useGlobalConfig();
  const binded = ConfigService.bind(configKey, path as FieldPath);
  const formattedLabel = startCase(label ?? path.split(".").pop() ?? path);
  const indentClass = depth > 0 ? `ml-${depth * 4}` : "";

  // String input
  if (typeof value === "string") {
    return (
      <box class={indentClass} spacing={spacing("large")}>
        <label
          class="font-medium text-on-surface/80 text-sm"
          halign={Align.START}
          label={formattedLabel}
        />
        <entry
          class="rounded-md border border-background-lighter bg-background-light px-3 py-2"
          hexpand
          onNotifyText={({ text }) => onUpdate(path, text)}
          text={value}
        />
      </box>
    );
  }

  // Number input
  if (typeof value === "number") {
    return (
      <box class={indentClass} spacing={spacing("large")}>
        <label
          class="font-medium text-on-surface/80 text-sm"
          halign={Align.START}
          label={formattedLabel}
        />
        <entry
          class="rounded-md border border-background-lighter bg-background-light px-3 py-2 font-mono"
          hexpand
          onNotifyText={({ text }) => {
            const num = Number(text);
            if (!Number.isNaN(num)) onUpdate(path, num);
          }}
          text={value.toString()}
        />
      </box>
    );
  }

  // Boolean switch
  if (typeof value === "boolean") {
    return (
      <box class={indentClass} spacing={spacing("large")}>
        <label
          class="font-medium text-on-surface/80 text-sm"
          halign={Align.START}
          label={formattedLabel}
        />
        <togglebutton
          active={binded}
          class="rounded-full border-1 border-background-lighter bg-background-light px-4 py-1"
          label={binded((b) => (b ? "On" : "Off"))}
          onNotifyActive={(self) => onUpdate(path, self.active)}
        />
      </box>
    );
  }

  // Array display
  if (Array.isArray(value)) {
    return (
      <box
        class={indentClass}
        orientation={Orientation.VERTICAL}
        spacing={spacing("medium")}
      >
        <label
          class="font-semibold text-on-surface text-sm"
          halign={Align.START}
          label={formattedLabel}
        />
        <box
          class="ml-4 border-background-light/60 border-l-2 pl-3"
          orientation={Orientation.VERTICAL}
          spacing={spacing("small")}
        >
          <For each={binded}>
            {(val, idx) => (
              <label
                class="text-on-surface/70 text-sm"
                halign={Align.START}
                label={`${idx() + 1}. ${val}`}
              />
            )}
          </For>
        </box>
      </box>
    );
  }

  // Object (nested fields)
  if (typeof value === "object") {
    return (
      <box
        class={indentClass}
        hexpand={false}
        orientation={Orientation.VERTICAL}
        spacing={spacing("large")}
      >
        <label
          class="border-background/30 border-b-1 pb-1 font-semibold text-base text-on-surface"
          halign={Align.START}
          label={formattedLabel}
        />
        <box
          class="ml-2 h-32 w-80"
          orientation={Orientation.VERTICAL}
          spacing={spacing("large")}
        >
          {Object.entries(value).map(([key, val]) => (
            <ConfigField
              configKey={configKey}
              depth={depth + 1}
              label={key}
              onUpdate={onUpdate}
              path={`${path}.${key}`}
              value={val}
            />
          ))}
        </box>
      </box>
    );
  }

  // Fallback
  return (
    <label
      class={`text-on-surface/60 text-sm ${indentClass}`}
      label={`${formattedLabel}: ${value}`}
    />
  );
}
