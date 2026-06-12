import { Align, EllipsizeMode, Orientation } from "@/enums";
import { useLauncherItem } from "@/hooks/features/launcher/useLauncherItem";
import { usePixelSize } from "@/hooks/services/usePixelSize";
import { useSpacing } from "@/hooks/services/useSpacing";

interface LauncherItemProps {
  index: number;
}

export default function LauncherItem({ index }: LauncherItemProps) {
  const spacing = useSpacing();
  const pixelSize = usePixelSize();
  const result = useLauncherItem(index);

  return (
    <button
      class="rounded-lg px-3 py-2 transition-colors hover:bg-white/5 focus:bg-white/8 active:bg-white/10"
      focusOnClick={false}
      heightRequest={54}
      onActivate={result.activate}
      onClicked={result.activate}
      valign={Align.CENTER}
      visible={result.visible}
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
            visible={result.hasDescription}
            xalign={0}
          />
        </box>
      </box>
    </button>
  );
}
