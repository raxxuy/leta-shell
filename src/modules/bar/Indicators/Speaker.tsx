import { useWirePlumber } from "@/hooks/system/useWirePlumber";
import EndpointControl from "./EndpointControl";

export default function Speaker() {
  const { speaker, speakers } = useWirePlumber();
  
  return (
    <EndpointControl
      endpoint={speaker}
      endpoints={speakers}
      resolveIcon={(muted, vol) => {
        if (muted || vol === 0) return "volume-x";
        if (vol < 0.5) return "volume-min";
        return "volume-max";
      }}
    />
  );
}
