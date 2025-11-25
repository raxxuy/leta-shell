import AstalWp from "gi://AstalWp";
import { createBinding, createState } from "ags";
import { Gtk } from "ags/gtk4";
import { EventControllerScrollFlags, RevealerTransitionType } from "@/enums";
import { adjustVolume, muteEndpoint, roundVolume } from "@/lib/utils/volume";

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
    <box class={className} spacing={4}>
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
        <image class={`${className}-icon`} iconName={iconName} pixelSize={16} />
      </button>
    </box>
  );
};

export default function Sound() {
  const wp = AstalWp.get_default();
  const { defaultSpeaker: speaker, defaultMicrophone: microphone } = wp;

  return (
    <box class="sound" spacing={10}>
      <Endpoint class="sound-speaker" endpoint={speaker} />
      <Endpoint class="sound-microphone" endpoint={microphone} />
    </box>
  );
}
