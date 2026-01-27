import Adw from "gi://Adw";
import { For } from "ags";
import { Gtk } from "ags/gtk4";
import { timeout } from "ags/time";
import { range } from "es-toolkit/math";
import { Align, Orientation } from "@/enums";
import ConfigService from "@/services/config";
import HyprlandService from "@/services/hyprland";
import WorkspaceButton from "./WorkspaceButton";

export default function Workspaces() {
  const hyprlandService = HyprlandService.get_default();
  const spacings = ConfigService.bind("global", "spacings");
  const workspaces = ConfigService.bind("bar", "modules.workspaces");

  let scrollLocked = false;

  const ws = workspaces((ws) =>
    range(ws.count).map((_, i) => hyprlandService.workspaceDummy(i + 1, null)),
  );

  const handleScroll = (direction: number) => {
    const delta = Math.sign(direction);
    if (!delta || scrollLocked) return;

    scrollLocked = true;
    hyprlandService.changeWorkspace(delta);

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
