import { Orientation } from "@/enums";
import { createReactiveMemo } from "@/lib/reactive";
import type { Reactive } from "@/types/reactive";

interface SettingsGroupProps {
  children: JSX.Element | JSX.Element[];
  description?: Reactive<string>;
  title: Reactive<string>;
}

export default function SettingsGroup({
  title: titleProp,
  description: descriptionProp,
  children,
}: SettingsGroupProps) {
  const title = createReactiveMemo(titleProp);
  const description = createReactiveMemo(descriptionProp ?? "");

  return (
    <box
      class="rounded-xl border border-white/10 bg-white/2.5"
      orientation={Orientation.VERTICAL}
    >
      <box class="px-5 py-4" orientation={Orientation.VERTICAL}>
        <label
          class="font-medium text-base"
          halign={0}
          label={title}
          xalign={0}
        />

        {description && (
          <label
            class="mt-1 font-medium text-sm text-white/40"
            halign={0}
            label={description}
            xalign={0}
          />
        )}
      </box>

      <box class="min-h-px bg-white/10" />

      <box class="p-2" orientation={Orientation.VERTICAL}>
        {children}
      </box>
    </box>
  );
}
