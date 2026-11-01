import { Align, Orientation } from "@/enums";
import { createReactiveMemo } from "@/lib/reactive";
import { useTheme } from "@/providers/ThemeProvider";
import type { Reactive } from "@/types/reactive";

interface SettingsRowProps {
  children: JSX.Element;
  description?: Reactive<string>;
  title: Reactive<string>;
  uppercase?: Reactive<boolean>;
}

export default function SettingsRow({
  title: titleProp,
  description: descriptionProp = "",
  uppercase: uppercaseProp = false,
  children,
}: SettingsRowProps) {
  const { spacing } = useTheme();

  const title = createReactiveMemo(titleProp);
  const description = createReactiveMemo(descriptionProp);
  const uppercase = createReactiveMemo(uppercaseProp);

  return (
    <box
      class="rounded-lg px-3 py-2 hover:bg-white/5"
      spacing={spacing.md}
      valign={Align.CENTER}
    >
      <box
        hexpand
        orientation={Orientation.VERTICAL}
        spacing={spacing.scale("xs", 0.5)}
      >
        <label
          class={uppercase(
            (u) => `font-medium text-sm tracking-wide ${u ? "uppercase" : ""}`,
          )}
          halign={Align.START}
          label={title}
          xalign={0}
        />

        {description && (
          <label
            class="text-sm font-medium text-white/40"
            halign={Align.START}
            label={description}
            xalign={0}
          />
        )}
      </box>

      {children}
    </box>
  );
}
