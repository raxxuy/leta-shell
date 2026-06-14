import type AstalWp from "gi://AstalWp";
import type { Accessor } from "ags";
import ContextMenu from "@/components/ContextMenu";
import MenuButton from "@/components/MenuButton";
import Popover from "@/components/Popover";
import { Align, Orientation, WrapMode } from "@/enums";
import useEndpoint from "@/hooks/features/audio/useEndpoint";
import { usePixelSize } from "@/hooks/services/usePixelSize";
import { useSpacing } from "@/hooks/services/useSpacing";
import { useWirePlumber } from "@/hooks/system/useWirePlumber";

interface EndpointControlProps {
  endpoint: AstalWp.Endpoint;
  endpoints: Accessor<AstalWp.Endpoint[]>;
  resolveIcon: (muted: boolean, volume: number) => string;
}

export default function EndpointControl({
  endpoint,
  endpoints,
  resolveIcon,
}: EndpointControlProps) {
  const spacing = useSpacing();
  const pixelSize = usePixelSize();
  const { setDefaultEndpoint } = useWirePlumber();
  const {
    toggleMute,
    volume,
    setVolume,
    description,
    formattedVolume,
    iconName,
  } = useEndpoint(endpoint, resolveIcon);

  return (
    <MenuButton
      class="bar-menubutton"
      focusable={false}
      tooltipText={description}
    >
      <image iconName={iconName} pixelSize={pixelSize.sm} />
      <Popover animated class="bar-popover min-w-sm" hasArrow={false}>
        <box orientation={Orientation.VERTICAL} spacing={spacing.lg}>
          <box hexpand spacing={spacing.md} valign={Align.CENTER}>
            <MenuButton class="" focusable={false}>
              <label
                class="font-semibold opacity-90"
                label={description}
                maxWidthChars={32}
                wrap
                wrapMode={WrapMode.WORD_CHAR}
                xalign={0}
              />
              <Popover animated class="m-[5px_10px_15px] shadow-md">
                <ContextMenu
                  class="rounded-lg border border-tertiary/20 bg-zinc-950/95 p-1.5 shadow-lg"
                  items={endpoints((endpoints) =>
                    endpoints.map((endpoint) => ({
                      label: endpoint.description ?? "",
                      onClick: () => setDefaultEndpoint(endpoint),
                    })),
                  )}
                  labelClass="font-medium capitalize"
                  spacing={spacing.sm}
                />
              </Popover>
            </MenuButton>
            <box hexpand /> {/* spacer */}
            <button
              focusable={false}
              onClicked={toggleMute}
              valign={Align.START}
            >
              <label
                class="transform-cpu font-semibold hover:scale-105"
                label={formattedVolume}
                xalign={1}
              />
            </button>
          </box>
          <box class="min-h-4" valign={Align.CENTER}>
            <slider
              class="bar-endpoint-slider"
              hexpand
              max={1}
              min={0}
              onChangeValue={({ value }) => setVolume(value)}
              valign={Align.CENTER}
              value={volume}
            />
          </box>
        </box>
      </Popover>
    </MenuButton>
  );
}
