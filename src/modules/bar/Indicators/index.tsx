import { Align } from "@/enums";
import useSpacing from "@/hooks/services/config/useSpacing";
import Bluetooth from "./Bluetooth";
import Microphone from "./Microphone";
import Speaker from "./Speaker";

export default function Indicators() {
  const spacing = useSpacing();

  return (
    <box spacing={spacing.sm} valign={Align.CENTER}>
      <Speaker />
      <Microphone />
      <Bluetooth />
    </box>
  );
}
