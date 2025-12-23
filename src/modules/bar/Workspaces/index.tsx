import Adw from "gi://Adw";
import AstalHyprland from "gi://AstalHyprland";
import { range } from "es-toolkit/math";
import { Orientation } from "@/enums";
import { getConfig } from "@/lib/config";
import WorkspaceButton from "@/modules/bar/Workspaces/WorkspaceButton";

const {
  modules: { workspaces },
} = getConfig("bar");
const { spacings } = getConfig("global");

export default function Workspaces() {
  const ws = range(workspaces.count).map((_, i) =>
    AstalHyprland.Workspace.dummy(i + 1, null),
  );

  return (
    <Adw.Clamp maximumSize={16} orientation={Orientation.VERTICAL}>
      <box class="workspaces" spacing={spacings.small}>
        {ws.map((workspace) => (
          <WorkspaceButton workspace={workspace} />
        ))}
      </box>
    </Adw.Clamp>
  );
}
