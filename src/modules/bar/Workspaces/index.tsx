import Adw from "gi://Adw";
import { For } from "ags";
import { Gtk } from "ags/gtk4";
import { timeout } from "ags/time";
import { range } from "es-toolkit/math";
import { Align, Orientation } from "@/enums";
import WorkspaceButton from "@/modules/bar/Workspaces/WorkspaceButton";
import ConfigManager from "@/services/configs";
import Hyprland from "@/services/hyprland";

export default function Workspaces() {
  const hyprland = Hyprland.get_default();
  const spacings = ConfigManager.bind("global", "spacings");
  const workspaces = ConfigManager.bind("bar", "modules.workspaces");

  let scrollLocked = false;

  const ws = workspaces((ws) =>
    range(ws.count).map((_, i) => hyprland.workspaceDummy(i + 1, null)),
  );

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
      <box halign={Align.CENTER} spacing={spacings((s) => s.small)}>
        <For each={ws}>
          {(workspace) => <WorkspaceButton workspace={workspace} />}
        </For>
      </box>
    </Adw.Clamp>
  );
}
