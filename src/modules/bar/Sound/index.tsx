import AstalWp from "gi://AstalWp";
import { getConfig } from "@/lib/config";
import Endpoint from "@/modules/bar/Sound/Endpoint";

const { spacings } = getConfig("global");

export default function Sound() {
  const wp = AstalWp.get_default();
  const { defaultSpeaker: speaker, defaultMicrophone: microphone } = wp;

  return (
    <box class="sound" spacing={spacings.medium}>
      <Endpoint endpoint={speaker} type="speaker" />
      <Endpoint endpoint={microphone} type="microphone" />
    </box>
  );
}
