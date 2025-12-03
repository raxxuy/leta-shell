import type AstalWp from "gi://AstalWp";
import { createBinding, createComputed, createState } from "ags";
import { Gtk } from "ags/gtk4";
import { EventControllerScrollFlags, RevealerTransitionType } from "@/enums";
import { getConfig } from "@/lib/config";
import {
  adjustVolume,
  formatVolume,
  getIcon,
  toggleMute,
} from "@/lib/utils/volume";

const { spacings, icons } = getConfig("bar");

interface EndpointProps {
  endpoint: AstalWp.Endpoint;
  class: string;
  type: "speaker" | "microphone";
}

export default function Endpoint({
  endpoint,
  class: className,
  type,
}: EndpointProps) {
  const [revealed, setRevealed] = createState<boolean>(false);
  const mute = createBinding(endpoint, "mute");
  const volume = createBinding(endpoint, "volume");
  const description = createBinding(endpoint, "description");

  const iconName = createComputed(() => {
    return getIcon(type, volume(), mute());
  });

  return (
    <box class={className} spacing={spacings.small}>
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
        <label class={`${className}-label`} label={volume(formatVolume)} />
      </revealer>
      <button onClicked={() => toggleMute(endpoint)}>
        <image
          class={`${className}-icon`}
          iconName={iconName}
          pixelSize={icons.pixelSize.small}
          tooltipText={description}
        />
      </button>
    </box>
  );
}
