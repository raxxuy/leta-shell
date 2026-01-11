import Adw from "gi://Adw";
import { Gtk } from "ags/gtk4";
import { timeout } from "ags/time";
import { range } from "es-toolkit/math";
import { Orientation } from "@/enums";
import { getConfig } from "@/lib/config";
import { getNestedValue } from "@/lib/utils";
import WorkspaceButton from "@/modules/bar/Workspaces/WorkspaceButton";
import Hyprland from "@/services/hyprland";

const { spacings } = getConfig("global");
const workspaces = getNestedValue("bar", "modules.workspaces");

export default function Workspaces() {
  const hyprland = Hyprland.get_default();

  const ws = range(workspaces.count).map((_, i) =>
    hyprland.workspaceDummy(i + 1, null),
  );

  let scrollLocked = false;

  const handleScroll = (direction: number) => {
    const delta = Math.sign(direction);
    if (!delta || scrollLocked) return;

    scrollLocked = true;
    hyprland.changeWorkspace(delta);
    timeout(200, () => {
      scrollLocked = false;
    });
  };

  return (
    <Adw.Clamp maximumSize={16} orientation={Orientation.VERTICAL}>
      <Gtk.EventControllerScroll
        flags={Gtk.EventControllerScrollFlags.VERTICAL}
        onScroll={(_, __, direction) => handleScroll(direction)}
      />
      <box spacing={spacings.small}>
        {ws.map((workspace) => (
          <WorkspaceButton workspace={workspace} />
        ))}
      </box>
    </Adw.Clamp>
  );
}
