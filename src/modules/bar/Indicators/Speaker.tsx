import clsx from "clsx/lite";
import MenuButton from "@/components/ui/MenuButton";
import Popover from "@/components/ui/Popover";
import { Align, Orientation, WrapMode } from "@/enums";
import useEndpoint from "@/hooks/features/audio/useEndpoint";
import usePixelSize from "@/hooks/services/usePixelSize";
import useSpacing from "@/hooks/services/useSpacing";
import useWirePlumber from "@/hooks/system/useWirePlumber";

export default function Speaker() {
  const spacing = useSpacing();
  const pixelSize = usePixelSize();
  const { speaker } = useWirePlumber();
  const {
    toggleMute,
    volume,
    setVolume,
    description,
    formattedVolume,
    iconName,
  } = useEndpoint(speaker, (muted, volume) => {
    if (muted || volume === 0) return "volume-x";
    if (volume < 0.5) return "volume-min";
    return "volume-max";
  });

  return (
    <MenuButton
      class="bar-menubutton"
      focusable={false}
      tooltipText={description}
    >
      <image iconName={iconName} pixelSize={pixelSize.sm} />
      <Popover animated class="bar-popover min-w-xs" hasArrow={false}>
        <box orientation={Orientation.VERTICAL} spacing={spacing.lg}>
          <box hexpand valign={Align.CENTER}>
            <label
              class="font-semibold opacity-90"
              label={description}
              maxWidthChars={32}
              wrap
              wrapMode={WrapMode.WORD_CHAR}
              xalign={0}
            />
            <box hexpand /> {/* spacer */}
            <button focusable={false} onClicked={toggleMute}>
              <label
                class="transform-cpu font-semibold hover:scale-105"
                label={formattedVolume}
                xalign={1}
              />
            </button>
          </box>
          <box class="min-h-4" valign={Align.CENTER}>
            <slider
              class={clsx(
                "rounded-full bg-white/12",
                "[&_highlight]:rounded-full [&_highlight]:bg-white/95",
                "[&_slider:hover]:-my-0.5 [&_slider:hover]:min-h-[0.7rem] [&_slider:hover]:min-w-[0.7rem] [&_slider]:-my-px [&_slider]:min-h-2 [&_slider]:min-w-2 [&_slider]:rounded-full [&_slider]:bg-white",
                "active:[&_slider]:-my-0.5 active:[&_slider]:min-h-[0.7rem] active:[&_slider]:min-w-[0.7rem]",
              )}
              hexpand
              max={1}
              min={0}
              onChangeValue={({ value }) => setVolume(value)}
              orientation={Orientation.HORIZONTAL}
              valign={Align.CENTER}
              value={volume}
            />
          </box>
        </box>
      </Popover>
    </MenuButton>
  );
}
