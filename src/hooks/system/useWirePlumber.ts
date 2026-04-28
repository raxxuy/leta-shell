import AstalWp from "gi://AstalWp";
import { createBinding } from "ags";

export default function useWirePlumber() {
  const wp = AstalWp.get_default();

  const speaker = wp.defaultSpeaker;
  const microphone = wp.defaultMicrophone;

  const devices = createBinding(wp, "devices");

  return { speaker, microphone, devices };
}
