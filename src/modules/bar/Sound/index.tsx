import AstalWp from "gi://AstalWp";
import { useGlobalConfig } from "@/hooks/useConfig";
import Endpoint from "./Endpoint";

export default function Sound() {
  const { spacing } = useGlobalConfig();
  const { defaultSpeaker, defaultMicrophone } = AstalWp.get_default();

  return (
    <box spacing={spacing("medium")}>
      <Endpoint endpoint={defaultSpeaker} type="speaker" />
      <Endpoint endpoint={defaultMicrophone} type="microphone" />
    </box>
  );
}
