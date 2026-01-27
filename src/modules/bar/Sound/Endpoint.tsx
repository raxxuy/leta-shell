import AstalWp from "gi://AstalWp";
import { createBinding, createComputed, createState, For } from "ags";
import { Gtk } from "ags/gtk4";
import clsx from "clsx/lite";
import { PopoverButton } from "@/components/button";
import Container from "@/components/Container";
import {
  EventControllerScrollFlags,
  Orientation,
  RevealerTransitionType,
} from "@/enums";
import { getIcon } from "@/lib/icons";
import { adjustVolume, formatVolume, toggleMute } from "@/lib/utils";
import ConfigService from "@/services/config";
import EndpointListItem from "./EndpointListItem";

interface EndpointProps {
  endpoint: AstalWp.Endpoint;
  type: "speaker" | "microphone";
}

export default function Endpoint({ endpoint, type }: EndpointProps) {
  const audio = AstalWp.get_default().audio;
  const icons = ConfigService.bind("global", "icons");
  const spacings = ConfigService.bind("global", "spacings");
  const mute = createBinding(endpoint, "mute");
  const volume = createBinding(endpoint, "volume");
  const devices = createBinding(audio, `${type}s`);
  const description = createBinding(endpoint, "description");

  const [revealed, setRevealed] = createState<boolean>(false);
  const [opened, setOpened] = createState<boolean>(false);

  const iconName = createComputed(() => {
    return getIcon({
      type: "volume",
      subtype: type,
      volume: volume(),
      mute: mute(),
    });
  });

  const className = opened((o) =>
    clsx(o && "rounded selected:bg-background-lighter"),
  );

  return (
    <box>
      <Gtk.EventControllerScroll
        flags={EventControllerScrollFlags.VERTICAL}
        onScroll={(_, __, direction) => adjustVolume(endpoint, direction)}
      />
      <Gtk.EventControllerMotion
        onEnter={() => setRevealed(true)}
        onLeave={() => setRevealed(false)}
      />
      {/** biome-ignore assist/source/useSortedAttributes: rendering issues */}
      <revealer
        visible={revealed}
        revealChild={revealed}
        transitionType={RevealerTransitionType.SWING_LEFT}
      >
        <label class="w-12 font-bold" label={volume(formatVolume)} />
      </revealer>
      <PopoverButton
        class={className}
        initCss={false}
        onClicked={() => toggleMute(endpoint)}
      >
        <image
          iconName={iconName}
          pixelSize={icons((i) => i.pixelSize.small)}
          tooltipText={description}
        />
        <popover onNotifyVisible={({ visible }) => setOpened(visible)}>
          <Container
            orientation={Orientation.VERTICAL}
            spacing={spacings((s) => s.small)}
          >
            <For each={devices}>
              {(device) => <EndpointListItem endpoint={device} />}
            </For>
          </Container>
        </popover>
      </PopoverButton>
    </box>
  );
}
