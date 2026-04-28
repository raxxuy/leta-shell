import MenuButton from "@/components/ui/MenuButton";
import Popover from "@/components/ui/Popover";
import { Align, Orientation, WrapMode } from "@/enums";
import usePixelSize from "@/hooks/services/config/usePixelSize";
import useSpacing from "@/hooks/services/config/useSpacing";
import useEndpoint from "@/hooks/system/useEndpoint";
import useWirePlumber from "@/hooks/system/useWirePlumber";

export default function Microphone() {
  const spacing = useSpacing();
  const pixelSize = usePixelSize();
  const { microphone } = useWirePlumber();
  const {
    toggleMute,
    volume,
    setVolume,
    description,
    formattedVolume,
    iconName,
  } = useEndpoint(microphone, (muted, volume) =>
    muted || volume === 0 ? "microphone-off-01" : "microphone-01",
  );

  return (
    <MenuButton
      class="min-h-6.5 min-w-6.5 rounded-lg transition-colors checked:bg-zinc-700 hover:bg-zinc-800 active:bg-zinc-700"
      tooltipText={description}
    >
      <image iconName={iconName} pixelSize={pixelSize.sm} />
      <Popover
        animated
        class="m-[5px_10px_15px] mt-4 min-w-xs rounded-2xl border border-(--tertiary)/20 bg-zinc-950/95 p-6 shadow-md"
        hasArrow={false}
      >
        <box orientation={Orientation.VERTICAL} spacing={spacing.md}>
          <box hexpand>
            <label
              class="font-semibold opacity-90"
              halign={Align.START}
              label={description}
              maxWidthChars={32}
              wrap
              wrapMode={WrapMode.WORD_CHAR}
              xalign={0}
            />
            <box
              class="min-w-14 pl-4"
              halign={Align.END}
              hexpand
              valign={Align.CENTER}
            >
              <button focusable={false} onClicked={toggleMute}>
                <label
                  class="hover:transform-[scale(1.1)] font-semibold"
                  halign={Align.END}
                  hexpand
                  label={formattedVolume}
                  xalign={1}
                />
              </button>
            </box>
          </box>
          <box class="min-h-4" valign={Align.CENTER}>
            <slider
              class="endpoint-slider"
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
