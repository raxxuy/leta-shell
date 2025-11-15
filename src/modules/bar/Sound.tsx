import AstalWp from "gi://AstalWp";
import { createBinding, createState } from "ags";
import { Gtk } from "ags/gtk4";
import { RevealerTransitionType } from "@/enums";

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

  const roundVolume = (v: number) => Math.round(v * 100);

  const adjustVolume = (direction: number) => {
    if (direction === -1)
      endpoint.set_volume(Math.min(1, endpoint.volume + 0.05));
    else endpoint.set_volume(Math.max(0, endpoint.volume - 0.05));
  };

  const muteEndpoint = () => {
    endpoint.mute = !endpoint.mute;
  };

  return (
    <box class={className}>
      <Gtk.EventControllerScroll
        flags={Gtk.EventControllerScrollFlags.BOTH_AXES}
        onScroll={(_, __, direction) => adjustVolume(direction)}
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
      <button onClicked={muteEndpoint}>
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
