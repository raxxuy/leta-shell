import { Align } from "@/enums";
import { useSpacing } from "@/hooks/services/useSpacing";
import Bluetooth from "./Bluetooth";
import Microphone from "./Microphone";
import Notifications from "./Notifications";
import Power from "./Power";
import Speaker from "./Speaker";

export default function Indicators() {
  const spacing = useSpacing();

  return (
    <box spacing={spacing.sm} valign={Align.CENTER}>
      <Power />
      <Speaker />
      <Microphone />
      <Bluetooth />
      <Notifications />
    </box>
  );
}
