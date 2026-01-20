import AstalWp from "gi://AstalWp";
import { createBinding, createComputed, createState, For } from "ags";
import { Gtk } from "ags/gtk4";
import {
  EventControllerScrollFlags,
  Orientation,
  RevealerTransitionType,
} from "@/enums";
import { getIcon } from "@/lib/icons";
import { adjustVolume, cls, formatVolume, toggleMute } from "@/lib/utils";
import EndpointListItem from "@/modules/bar/Sound/EndpointListItem";
import ConfigManager from "@/services/configs";
import Container from "@/widgets/Container";
import PopoverButton from "@/widgets/PopoverButton";

interface EndpointProps {
  endpoint: AstalWp.Endpoint;
  type: "speaker" | "microphone";
}

export default function Endpoint({ endpoint, type }: EndpointProps) {
  const audio = AstalWp.get_default().audio;
  const configManager = ConfigManager.get_default();
  const icons = configManager.bind("global", "icons");
  const spacings = configManager.bind("global", "spacings");
  const mute = createBinding(endpoint, "mute");
  const volume = createBinding(endpoint, "volume");
  const description = createBinding(endpoint, "description");

  const [revealed, setRevealed] = createState<boolean>(false);
  const [opened, setOpened] = createState<boolean>(false);

  const iconName = createComputed(() => {
    return getIcon("volume", type, volume(), mute());
  });

  const devices = createBinding(audio, `${type}s`);

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
      <revealer
        visible={revealed}
        revealChild={revealed}
        transitionType={RevealerTransitionType.SWING_LEFT}
      >
        <label class="w-12 font-bold" label={volume(formatVolume)} />
      </revealer>
      <PopoverButton
        class={opened((o) => cls(o && "button", "m-0"))}
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
