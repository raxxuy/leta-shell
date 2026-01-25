import AstalWp from "gi://AstalWp";
import Endpoint from "@/modules/bar/Sound/Endpoint";
import ConfigManager from "@/services/configs";

export default function Sound() {
  const wp = AstalWp.get_default();
  const spacings = ConfigManager.bind("global", "spacings");
  const { defaultSpeaker: speaker, defaultMicrophone: microphone } = wp;

  return (
    <box spacing={spacings((s) => s.medium)}>
      <Endpoint endpoint={speaker} type="speaker" />
      <Endpoint endpoint={microphone} type="microphone" />
    </box>
  );
}
