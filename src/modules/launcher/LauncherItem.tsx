import type { Accessor } from "ags";
import { Align, EllipsizeMode, Orientation } from "@/enums";
import { useLauncherItem } from "@/hooks/services/launcher/useLauncher";
import usePixelSize from "@/hooks/services/usePixelSize";
import useSpacing from "@/hooks/services/useSpacing";
import type { LauncherResult } from "@/services/launcher/types";

interface LauncherItemProps {
  index: number;
  results: Accessor<LauncherResult[]>;
}

export default function LauncherItem({ results, index }: LauncherItemProps) {
  const spacing = useSpacing();
  const pixelSize = usePixelSize();
  const { visible, icon, label, description, hasDescription, activate } =
    useLauncherItem(results, index);

  return (
    <button
      class="rounded-lg px-3 py-2 transition-colors hover:bg-white/5 focus:bg-white/8 active:bg-white/10"
      focusOnClick={false}
      heightRequest={54}
      onActivate={activate}
      onClicked={activate}
      valign={Align.CENTER}
      visible={visible}
    >
      <box spacing={spacing.md} valign={Align.CENTER}>
        <image iconName={icon} pixelSize={pixelSize.md} />
        <box
          orientation={Orientation.VERTICAL}
          spacing={spacing.xs}
          valign={Align.CENTER}
        >
          <label
            class="font-semibold text-base leading-0"
            halign={Align.START}
            label={label}
            xalign={0}
          />
          <label
            class="font-medium text-sm leading-none opacity-50"
            ellipsize={EllipsizeMode.END}
            halign={Align.START}
            label={description}
            maxWidthChars={54}
            visible={hasDescription}
            xalign={0}
          />
        </box>
      </box>
    </button>
  );
}
