import CenterNotch from "./CenterNotch";
import Workspaces from "./Workspaces";

export default function BarModule() {
  return (
    <centerbox class="my-0.25 px-4">
      <box $type="start">
        <Workspaces />
      </box>
      <box $type="center">
        <CenterNotch />
      </box>
      <box $type="end">
        <label label={"bye"} />
      </box>
    </centerbox>
  );
}
