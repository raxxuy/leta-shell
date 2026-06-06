import { Align } from "@/enums";
import { usePixelSize } from "@/hooks/services/usePixelSize";
import { useSpacing } from "@/hooks/services/useSpacing";
import { openUrl } from "@/lib/browser";
import { toggleWindow } from "@/lib/window";
import type { Reactive } from "@/types/reactive";

interface RowProps {
  children: JSX.Element | JSX.Element[];
  label: Reactive<string>;
  tooltip?: string;
  tooltipUrl?: string;
}

export default function Row({
  label,
  tooltip,
  tooltipUrl,
  children,
}: RowProps) {
  const spacing = useSpacing();
  const pixelSize = usePixelSize();

  return (
    <box valign={Align.CENTER}>
      <box halign={Align.START} hexpand spacing={spacing.sm}>
        <label
          class="font-medium text-sm opacity-70"
          hexpand
          label={label}
          tooltipMarkup={!tooltipUrl ? tooltip : undefined}
        />
        {tooltipUrl && (
          <button
            class="opacity-40 hover:opacity-70"
            onClicked={() => {
              openUrl(tooltipUrl);
              toggleWindow("settings");
            }}
            tooltipMarkup={tooltip}
          >
            <image iconName="info-circle" pixelSize={pixelSize.sm} />
          </button>
        )}
      </box>
      <box spacing={spacing.sm}>{children}</box>
    </box>
  );
}
