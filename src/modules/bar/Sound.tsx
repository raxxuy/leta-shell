import AstalWp from "gi://AstalWp";
import { createBinding, createState } from "ags";
import { Gtk } from "ags/gtk4";
import { EventControllerScrollFlags, RevealerTransitionType } from "@/enums";
import { configs } from "@/lib/config";
import { adjustVolume, muteEndpoint, roundVolume } from "@/lib/utils/volume";

const {
  modules: {
    sound: {
      spacing,
      endpoint: { spacing: endpointSpacing },
    },
  },
  icons: { pixelSize },
} = configs.bar;

const Endpoint = ({
  endpoint,
  class: className,
}: {
  endpoint: AstalWp.Endpoint;
  class: string;
}) => {
  const [revealed, setRevealed] = createState<boolean>(false);
  const iconName = createBinding(endpoint, "volumeIcon");
  const volume = createBinding(endpoint, "volume");

  return (
    <box class={className} spacing={endpointSpacing}>
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
        <label
          class={`${className}-label`}
          label={volume((v) => `${roundVolume(v)}%`)}
        />
      </revealer>
      <button onClicked={() => muteEndpoint(endpoint)}>
        <image
          class={`${className}-icon`}
          iconName={iconName}
          pixelSize={pixelSize}
        />
      </button>
    </box>
  );
};

export default function Sound() {
  const wp = AstalWp.get_default();
  const { defaultSpeaker: speaker, defaultMicrophone: microphone } = wp;

  return (
    <box class="sound" spacing={spacing}>
      <Endpoint class="sound-speaker" endpoint={speaker} />
      <Endpoint class="sound-microphone" endpoint={microphone} />
    </box>
  );
}
