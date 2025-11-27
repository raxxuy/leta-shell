import { getConfig } from "@/lib/config";
import Clock from "@/modules/bar/Dashboard/Clock";

const { spacings } = getConfig("bar");

export default function Dashboard() {
  return (
    <menubutton class="dashboard">
      <box spacing={spacings.medium}>
        <Clock />
      </box>
    </menubutton>
  );
}
