import AstalWp from "gi://AstalWp";
import ConfigService from "@/services/config";
import Endpoint from "./Endpoint";

export default function Sound() {
  const wp = AstalWp.get_default();
  const spacings = ConfigService.bind("global", "spacings");
  const { defaultSpeaker: speaker, defaultMicrophone: microphone } = wp;

  return (
    <box spacing={spacings((s) => s.medium)}>
      <Endpoint endpoint={speaker} type="speaker" />
      <Endpoint endpoint={microphone} type="microphone" />
    </box>
  );
}
