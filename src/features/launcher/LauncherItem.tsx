import { Align, EllipsizeMode, Orientation } from "@/enums";
import { scan } from "@/lib/theme/plugin";
import { useTheme } from "@/providers/ThemeProvider";
import type { LauncherResult } from "@/services/launcher/types";

interface LauncherItemProps {
  result: LauncherResult;
}

export default function LauncherItem({ result }: LauncherItemProps) {
  const { spacing, pixelSize } = useTheme();

  return (
    <button
      $={scan}
      class="rounded-lg px-3 py-2 transition-colors hover:bg-white/5 focus:bg-white/8 active:bg-white/10"
      focusOnClick={false}
      heightRequest={54}
      onActivate={result.activate}
      onClicked={result.activate}
      valign={Align.CENTER}
    >
      <box spacing={spacing.md} valign={Align.CENTER}>
        <image iconName={result.icon} pixelSize={pixelSize.md} />
        <box
          orientation={Orientation.VERTICAL}
          spacing={spacing.xs}
          valign={Align.CENTER}
        >
          <label
            class="font-semibold text-base leading-0"
            halign={Align.START}
            label={result.label}
            xalign={0}
          />
          <label
            class="font-medium text-sm leading-none opacity-50"
            ellipsize={EllipsizeMode.END}
            halign={Align.START}
            label={result.description}
            maxWidthChars={54}
            visible={!!result.description}
            xalign={0}
          />
        </box>
      </box>
    </button>
  );
}
