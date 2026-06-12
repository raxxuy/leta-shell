import { useWirePlumber } from "@/hooks/system/useWirePlumber";
import EndpointControl from "./EndpointControl";

export default function Microphone() {
  const { microphone, microphones } = useWirePlumber();

  return (
    <EndpointControl
      endpoint={microphone}
      endpoints={microphones}
      resolveIcon={(muted, vol) =>
        muted || vol === 0 ? "microphone-off-01" : "microphone-01"
      }
    />
  );
}
