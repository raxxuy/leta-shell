import AstalWp from "gi://AstalWp";
import { createBinding } from "ags";

export const useWirePlumber = () => {
  const wp = AstalWp.get_default();
  const audio = wp.audio;
  const speaker = wp.defaultSpeaker;
  const microphone = wp.defaultMicrophone;

  const speakers = createBinding(audio, "speakers")((s) => s ?? []);
  const microphones = createBinding(audio, "microphones")((m) => m ?? []);

  const setDefaultEndpoint = (device: AstalWp.Endpoint) => {
    device.set_is_default(true);
  };

  return { speaker, microphone, speakers, microphones, setDefaultEndpoint };
};
