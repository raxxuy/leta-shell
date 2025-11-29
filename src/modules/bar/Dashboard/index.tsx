import { getConfig } from "@/lib/config";
import Clock from "@/modules/bar/Dashboard/Clock";

const { spacings } = getConfig("bar");

export default function Dashboard() {
  return (
    <box class="dashboard" spacing={spacings.medium}>
      <Clock />
    </box>
  );
}
