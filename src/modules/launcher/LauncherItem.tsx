import { Align, EllipsizeMode, Orientation } from "@/enums";
import { usePixelSize } from "@/hooks/services/config/usePixelSize";
import { useSpacing } from "@/hooks/services/config/useSpacing";
import { loadClasses } from "@/lib/theme";
import type { LauncherResult } from "@/services/launcher/types";

interface LauncherItemProps {
  result: LauncherResult;
}

export default function LauncherItem({ result }: LauncherItemProps) {
  const spacing = useSpacing();
  const pixelSize = usePixelSize();

  return (
    <button
      $={loadClasses(LauncherItem)}
      class="rounded-lg px-3 py-2 transition-colors hover:bg-white/5 focus:bg-white/8 active:bg-white/10"
      heightRequest={48}
      onActivate={result.activate}
    >
      <box spacing={spacing.md} valign={Align.CENTER}>
        <image iconName={result.icon} pixelSize={pixelSize.md} />
        <box
          orientation={Orientation.VERTICAL}
          spacing={spacing.xs}
          valign={Align.CENTER}
        >
          <label
            class="font-semibold text-base"
            halign={Align.START}
            label={result.label}
          />
          {result.description && (
            <label
              class="font-medium text-sm opacity-50"
              ellipsize={EllipsizeMode.END}
              halign={Align.START}
              label={result.description}
              maxWidthChars={56}
            />
          )}
        </box>
      </box>
    </button>
  );
}
